import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PremiumLeftNavbar from './components/premiumnavbar';
import FitnessApp from './components/business-setup/hero'
import Navbar from './components/business-setup/navbarr';
import Footer from './components/business-setup/footer'
import Dashboard from './components/homepage/dashboard';
import FoodNutritionAnalyzer from './components/business-setup/FoodNutritionAnalyzer';
import MealPlanGenerator from './components/business-setup/diet';
import WorkoutPlanGenerator from './components/business-setup/workoutplan';
import Tracking from './components/business-setup/tracking';
import FitnessCommunityHub from './components/community/CommunityHub';
import FitnessPaymentPage from './components/payment/pay';
import FitnessChatbot from './components/chatbot/Chatbot';
import { LiveMovementDetection } from './components/business-setup/opencv';
import { WorkoutPlanCard } from './components/business-setup/workout';
import { WorkoutRecommendations } from './components/business-setup/workoutrecommendation';
import { DietPlanCard } from './components/business-setup/dietplan';
import { DietRecommendation } from './components/business-setup/dietrecommendation';
import VoiceChat from './components/chatbot/voice';
import GoogleTranslate from './components/LanguageSwitcher';

// Create a Layout component to handle the sidebar + content structure
const DashboardLayout = ({ children }) => {
  return (
    <PremiumLeftNavbar>
      <div className="absolute top-4 right-4"> {/* Position dropdown in the dashboard */}
         <GoogleTranslate/> 
      </div>
      {children}
    </PremiumLeftNavbar>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar/>
            <FitnessApp/>
            <Footer />
          </>
        } />
        
        {/* Dashboard Pages with Layout */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard/>

          </DashboardLayout>
        } />
        <Route path="/food-nutrition" element={
          <DashboardLayout>
            <FoodNutritionAnalyzer/>
          </DashboardLayout>
}         />

<Route path="/meal-plan" element={
  <DashboardLayout>
    <MealPlanGenerator/>
    <DietPlanCard/>
    <DietRecommendation/>
  </DashboardLayout>
} />
<Route path="/video-analysis" element={
  <DashboardLayout>
    <VoiceChat/>
  </DashboardLayout>
} />

<Route path="/community" element={
  <DashboardLayout>
    <FitnessCommunityHub/>
  </DashboardLayout>
} />

<Route path="/payment" element={
  <DashboardLayout>
    <FitnessPaymentPage/>
  </DashboardLayout>
} />

<Route path="/workouts" element={
  <DashboardLayout>
    <WorkoutPlanGenerator/>
    <WorkoutPlanCard/>
    <WorkoutRecommendations/>
  </DashboardLayout>
} />

<Route path="/tracking" element={
  <DashboardLayout>
    <Tracking/>
  </DashboardLayout>
} />
        

        
        {/* Settings and Notifications can use the same layout */}
        <Route path="/settings" element={
          <DashboardLayout>
            <div>Settings Page Content</div>
          </DashboardLayout>
        } />
        
        <Route path="/notifications" element={
          <DashboardLayout>
            <div>Notifications Page Content</div>
          </DashboardLayout>
        } />
        
        {/* Logout route - redirects to home */}
        <Route path="/logout" element={
          <DashboardLayout>
            <div>Logging out...</div>
          </DashboardLayout>
        } />

      </Routes>
      <FitnessChatbot/>
    </Router>
  );
}

export default App;