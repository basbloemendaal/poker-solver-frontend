import { useState } from "react";
import { Container, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [holeCards, setHoleCards] = useState("");
  const [boardCards, setBoardCards] = useState("");
  const [result, setResult] = useState("");

  const handleSolve = async () => {
    const response = await axios.post("http://localhost:8000/solve", {
      hole_cards: holeCards.split(" "),
      board_cards: boardCards.split(" "),
      stack_size: 1000,
      pot_size: 500,
    });
    setResult(
      `Win Probability: ${response.data.win_probability.toFixed(
        2
      )}, Recommendation: ${response.data.recommendation}`
    );
  };

  return (
    <Container>
      <Typography variant="h4">Poker Solver</Typography>
      <TextField
        label="Hole Cards"
        value={holeCards}
        onChange={(e) => setHoleCards(e.target.value)}
      />
      <TextField
        label="Board Cards"
        value={boardCards}
        onChange={(e) => setBoardCards(e.target.value)}
      />
      <Button variant="contained" onClick={handleSolve}>
        Solve
      </Button>
      <Typography variant="h6">{result}</Typography>
    </Container>
  );
}

export default App;
