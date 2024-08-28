import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "../../../../firebase";
import { fetchBookCover } from "../routes/fetchBookCover";
import { doc, setDoc } from "firebase/firestore";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const systemPrompt = `
You are an expert in literature and book recommendations. Based on the user's reading preferences, including book titles, authors, genres, and ratings, provide a list of similar books that the user might enjoy. The recommendations should include the title, author, and genre of each book.


**MAKE SURE TO GENERATE 10 BOOK RECOMMENDATIONS** 

Consider the following rating scale:
1 - Did not like at all
2 - Somewhat liked it
3 - Neutral
4 - Liked the book
5 - Really liked the book

Use the provided ratings to gauge the user's preferences and recommend books that align with their interests.

Return the recommended books as a JSON object with the following structure:

{
    "recommendations": [
        {
            "title": "Sample Title 1",
            "author": "Sample Author 1",
            "genre": "Sample Genre 1"
        },
        {
            "title": "Sample Title 2",
            "author": "Sample Author 2",
            "genre": "Sample Genre 2"
        }
    ]
}`;

export async function POST(req) {
  try {
    const data = await req.json();
    const userId = req.headers.get("user-id");
    // console.log("Data received from client:", data);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(data) },
      ],
      temperature: 0.7,
    });

    let recommendations = JSON.parse(
      completion.choices[0].message.content
    ).recommendations;

    // console.log("Recommendations from OpenAI:", recommendations);

    for (const rec of recommendations) {
      const coverUrl = await fetchBookCover(rec.title, rec.author);
      rec.coverUrl = coverUrl;

      const docRef = doc(db, `users/${userId}/recommendations/${rec.title}`);
      await setDoc(docRef, rec);
    }

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Error generating recommendations" },
      { status: 500 }
    );
  }
}
