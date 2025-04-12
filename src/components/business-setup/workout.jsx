// WorkoutPlanCard.jsx
import { useState } from "react";
import { Edit, Plus } from "lucide-react";
import './workout.css';

export function WorkoutPlanCard() {
  const [activeWorkout, setActiveWorkout] = useState("strength");
  const [activeTab, setActiveTab] = useState("week1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="workout-card">
      <div className="card-header">
        <div className="header-content">
          <div>
            <h2 className="card-title">Current Workout Plan</h2>
            <p className="card-description">Your personalized 4-week workout plan</p>
          </div>
          <div className="button-group">
            <button className="btn-outline">
              <Edit size={16} />
              <span>Edit Plan</span>
            </button>
            <button className="btn-primary">
              <Plus size={16} />
              <span>New Plan</span>
            </button>
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="tabs">
          <div className="tabs-list">
            <button 
              className={`tab-trigger ${activeTab === "week1" ? "active" : ""}`}
              onClick={() => handleTabChange("week1")}
            >
              Week 1
            </button>
            <button 
              className={`tab-trigger ${activeTab === "week2" ? "active" : ""}`}
              onClick={() => handleTabChange("week2")}
            >
              Week 2
            </button>
            <button 
              className={`tab-trigger ${activeTab === "week3" ? "active" : ""}`}
              onClick={() => handleTabChange("week3")}
            >
              Week 3
            </button>
            <button 
              className={`tab-trigger ${activeTab === "week4" ? "active" : ""}`}
              onClick={() => handleTabChange("week4")}
            >
              Week 4
            </button>
          </div>
          
          {activeTab === "week1" && (
            <div className="tab-content">
              <div className="workout-grid">
                <div className="day-card">
                  <div className="day-header">
                    <h3 className="day-title">Monday</h3>
                    <div className="badge-container">
                      <span className="badge-primary">Upper Body</span>
                      <span className="badge-outline">45 min</span>
                    </div>
                  </div>
                  <div className="day-content">
                    <div className="exercise-list">
                      <div className="exercise-item">
                        <span>Bench Press</span>
                        <span>3 x 10</span>
                      </div>
                      <div className="exercise-item">
                        <span>Shoulder Press</span>
                        <span>3 x 12</span>
                      </div>
                      <div className="exercise-item">
                        <span>Lat Pulldown</span>
                        <span>3 x 12</span>
                      </div>
                      <div className="exercise-item">
                        <span>Bicep Curls</span>
                        <span>3 x 15</span>
                      </div>
                      <div className="exercise-item">
                        <span>Tricep Extensions</span>
                        <span>3 x 15</span>
                      </div>
                    </div>
                  </div>
                  <div className="day-footer">
                    <button className="btn-primary full-width">Start Workout</button>
                  </div>
                </div>

                <div className="day-card">
                  <div className="day-header">
                    <h3 className="day-title">Wednesday</h3>
                    <div className="badge-container">
                      <span className="badge-primary">Lower Body</span>
                      <span className="badge-outline">50 min</span>
                    </div>
                  </div>
                  <div className="day-content">
                    <div className="exercise-list">
                      <div className="exercise-item">
                        <span>Squats</span>
                        <span>4 x 8</span>
                      </div>
                      <div className="exercise-item">
                        <span>Deadlifts</span>
                        <span>4 x 6</span>
                      </div>
                      <div className="exercise-item">
                        <span>Leg Press</span>
                        <span>3 x 12</span>
                      </div>
                      <div className="exercise-item">
                        <span>Lunges</span>
                        <span>3 x 10 each</span>
                      </div>
                      <div className="exercise-item">
                        <span>Calf Raises</span>
                        <span>3 x 15</span>
                      </div>
                    </div>
                  </div>
                  <div className="day-footer">
                    <button className="btn-primary full-width">Start Workout</button>
                  </div>
                </div>

                <div className="day-card">
                  <div className="day-header">
                    <h3 className="day-title">Friday</h3>
                    <div className="badge-container">
                      <span className="badge-primary">Full Body</span>
                      <span className="badge-outline">55 min</span>
                    </div>
                  </div>
                  <div className="day-content">
                    <div className="exercise-list">
                      <div className="exercise-item">
                        <span>Push-ups</span>
                        <span>3 x 15</span>
                      </div>
                      <div className="exercise-item">
                        <span>Pull-ups</span>
                        <span>3 x 8</span>
                      </div>
                      <div className="exercise-item">
                        <span>Goblet Squats</span>
                        <span>3 x 12</span>
                      </div>
                      <div className="exercise-item">
                        <span>Dumbbell Rows</span>
                        <span>3 x 12</span>
                      </div>
                      <div className="exercise-item">
                        <span>Plank</span>
                        <span>3 x 45 sec</span>
                      </div>
                    </div>
                  </div>
                  <div className="day-footer">
                    <button className="btn-primary full-width">Start Workout</button>
                  </div>
                </div>
              </div>
              
              <div className="progress-section">
                <h3 className="progress-title">Week 1 Progress</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "33%" }}></div>
                </div>
                <div className="progress-stats">
                  <span>1/3 workouts completed</span>
                  <span>33%</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "week2" && (
            <div className="tab-content">
              <div className="placeholder-message">
                Week 2 workouts will be available after completing Week 1
              </div>
            </div>
          )}
          
          {activeTab === "week3" && (
            <div className="tab-content">
              <div className="placeholder-message">
                Week 3 workouts will be available after completing Week 2
              </div>
            </div>
          )}
          
          {activeTab === "week4" && (
            <div className="tab-content">
              <div className="placeholder-message">
                Week 4 workouts will be available after completing Week 3
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}