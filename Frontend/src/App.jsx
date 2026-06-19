import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Quiz from "./components/pages/Quiz";
import { Predict } from "./components";
import Chat from "./components/pages/Chat";
import VoiceBot from "./components/pages/Voice";
import NotFound from "./components/pages/NotFound";
import "regenerator-runtime/runtime";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/voice" element={<VoiceBot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
