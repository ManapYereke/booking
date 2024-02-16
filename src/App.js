import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MenuHoverProvider } from "./Context/Context";

import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import Reservation from "./Components/Reservation/Reservaton";
import ResultExam from "./Components/ResultExam/ResultExam";
import TrafficRulesInstructions from "./Components/TrafficRulesInstructions/TrafficRulesInstructions";
import TicketTheoryExam from "./Components/TicketTheoryExam/TicketTheoryExam";
import TheoryExamPage from "./Components/Reservation/TheoryExamPage/TheoryExamPage";
import SearchResultExam from "./Components/SearchResultExam/SearchResultExam";
import PracticeExamPage from "./Components/Reservation/PracticeExamPage/PracticeExamPage";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import TicketPracticeExam from "./Components/TicketPracticeExam/TicketPracticeExam";
import ErrorEnrollPage from "./Components/ErrorPage/ErrorEnrollPage";
import ErrorVerifyPage from "./Components/ErrorPage/ErrorVerifyPage";

import TrialExamPayment from "./Components/Reservation/TrialExamPage/TrialExamPayment";

import TrialExamPage from "./Components/Reservation/TrialExamPage/TrialExamPage";
import TicketTrialExam from "./Components/TicketTrialExam/TicketTrialExam";

import trialAgreement from "/home/erbulan/booking/src/assets/images/trialAgreement.pdf";





import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import PracticeExamVerification from "./Components/Reservation/PracticeExamPage/PracticeExamVerification";
import TheoryExamVerification from "./Components/Reservation/TheoryExamPage/TheoryExamVerification.js";
import TrialExamVerification from "./Components/Reservation/TrialExamPage/TrialExamVerification";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MenuHoverProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservation/practice-exam" element={<PracticeExamPage />} />

            <Route path="/reservation/trial-exam" element={<TrialExamPage />} />

            <Route path="/reservation/theory-exam" element={<TheoryExamPage />} />

            <Route path="/reservation/practice-exam/ticket" element={<TicketPracticeExam />} />
            <Route path="/reservation/theory-exam/ticket" element={<TicketTheoryExam />} />
            <Route path="/reservation/trial-exam/agreement" element={<iframe src={trialAgreement} width="100%" height="100%" title="Iframe Example"></iframe>} />

            <Route path="/reservation/trial-exam/ticket" element={<TicketTrialExam />} />


            <Route path="/reservation/theory-exam/verification" element={<TheoryExamVerification />} />

            <Route path="/reservation/practice-exam/verification" element={<PracticeExamVerification />} />

            <Route path="/reservation/trial-exam/verification" element={<TrialExamVerification />} />

            <Route path="/reservation/trial-exam/payment" element={<TrialExamPayment />} />

            <Route path="/result-exam" element={<ResultExam />} />
            <Route path="/stream" element={<TrafficRulesInstructions />} />
            <Route path="/search-result-exam" element={<SearchResultExam />} />
            <Route path="/error-enroll-page" element={<ErrorEnrollPage />} />
            <Route path="/error-verify-page" element={<ErrorVerifyPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MenuHoverProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
