"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { db } from "../../../firebase";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});
  const { user } = useUser();

  const getRecommendations = async () => {
    if (!user) return;

    const recommendationsCollectionRef = collection(
      db,
      `users/${user.id}/recommendations`
    );
    const recommendationsSnapshot = await getDocs(recommendationsCollectionRef);

    const fetchedRecommendations = [];
    recommendationsSnapshot.forEach((doc) => {
      fetchedRecommendations.push({ id: doc.id, ...doc.data() });
    });

    setRecommendations(fetchedRecommendations);
    setLoading(false);
  };

  const generateRecommendations = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": user.id,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        await getRecommendations();
      } else {
        console.error("Failed to generate recommendations.");
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
    }
  };

  const checkAndGenerateRecommendations = async () => {
    const userDocRef = doc(db, `users/${user.id}`);
    const userDoc = await getDoc(userDocRef);
    const lastGenerated = userDoc.data()?.lastGenerated;

    const oneDay = 24 * 60 * 60 * 1000;
    const canGenerate =
      !lastGenerated ||
      new Date().getTime() - lastGenerated.toMillis() > oneDay;

    if (canGenerate) {
      await generateRecommendations();
      await setDoc(userDocRef, { lastGenerated: new Date() }, { merge: true });
    } else {
      console.log("Wait before generating new recommendations.");
    }
  };

  useEffect(() => {
    if (user) {
      getRecommendations();
    }
  }, [user]);

  const handleCardClick = (index) => {
    setFlipped((prevFlipped) => ({
      ...prevFlipped,
      [index]: !prevFlipped[index],
    }));
  };

  const handleDeleteRecommendation = async (recId) => {
    try {
      const recRef = doc(db, `users/${user.id}/recommendations`, recId);
      await deleteDoc(recRef);
      setRecommendations(recommendations.filter((rec) => rec.id !== recId));
    } catch (error) {
      console.error("Error deleting recommendation: ", error);
    }
  };

  if (!user) {
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: "200px", height: "100vh", textAlign: "center" }}
      >
        <Typography variant="h3">
          Please sign in to see your recommendations
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size="10rem" />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="100%"
      sx={{ marginTop: "200px", height: "100%", mb: "3rem" }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "#463f3a",
          mb: "50px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Your Recommendations
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "50px" }}>
        <Button
          onClick={checkAndGenerateRecommendations}
          sx={{
            mb: "20px",
            color: "#fefae0",
            bgcolor: "#6b705c",
            "&:hover": {
              bgcolor: "#757b65",
            },
          }}
        >
          Generate Recommendations
        </Button>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
        }}
      >
        {recommendations.length > 0 ? (
          <Grid container spacing={2}>
            {recommendations.map((rec, index) => (
              <Grid
                item
                xs={12}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    width: "200px",
                    height: "300px",
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <Box
                      sx={{
                        color: "#fff",
                        bgcolor: "#faedcd",
                        perspective: "1000px",
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        }}
                      >
                        <div
                          style={{
                            bgcolor: "transparent",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "16px",
                            boxSizing: "border-box",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <CardMedia>
                            <img
                              src={rec.coverUrl}
                              alt={rec.title}
                              style={{ width: "200px", height: "auto" }}
                            />
                          </CardMedia>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "16px",
                            boxSizing: "border-box",
                            backgroundColor: "#6b705c",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                color: "#fefae0",
                              }}
                            >
                              {rec.title}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: "bold",
                                color: "#fefae0",
                              }}
                            >
                              Author: {rec.author}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                color: "#fefae0",
                              }}
                            >
                              Genre: {rec.genre}
                            </Typography>
                            <Button
                              onClick={() => {
                                handleDeleteRecommendation(rec.id);
                              }}
                              sx={{
                                mt: "10px",
                                fontSize: "10px",
                                color: "#fff",
                                bgcolor: "#0496ff",
                                "&:hover": {
                                  color: "#fff",
                                  bgcolor: "#008ff5",
                                },
                              }}
                            >
                              Delete Recommendation
                            </Button>
                          </Box>
                        </div>
                      </div>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h5"
            sx={{ color: "#fefae0", textAlign: "center" }}
          >
            No recommendations available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Recommendations;
