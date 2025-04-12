import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: 28,
    weight: 75,
    height: 178,
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  // Icon components
  const IconHome = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const IconSettings = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const IconUtensils = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );

  const IconDumbbell = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="m6.5 6.5 11 11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22 4-4"></path>
      <path d="m2 6 4-4"></path>
      <path d="m3 10 7-7"></path>
      <path d="m14 21 7-7"></path>
    </svg>
  );

  const IconActivity = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  );

  const IconCamera = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
      <circle cx="12" cy="13" r="3"></circle>
    </svg>
  );

  const IconSun = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  );

  const IconMoon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  );

  const IconMenu = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  );

  const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  );

  // Components
  const Progress = ({ value }) => {
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${value}%` }}></div>
      </div>
    );
  };

  const Card = ({ children, className }) => {
    return <div className={`card ${className || ""}`}>{children}</div>;
  };

  const CardHeader = ({ children }) => {
    return <div className="card-header">{children}</div>;
  };

  const CardTitle = ({ children }) => {
    return <h3 className="card-title">{children}</h3>;
  };

  const CardDescription = ({ children }) => {
    return <p className="card-description">{children}</p>;
  };

  const CardContent = ({ children }) => {
    return <div className="card-content">{children}</div>;
  };

  const Button = ({ children, variant, size, className, onClick }) => {
    return (
      <button 
        className={`button ${variant || ""} ${size || ""} ${className || ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const BmiCalculator = ({ userData }) => (
    <Card className="bmi-calculator">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bmi-result">
          <div className="bmi-value">22.5</div>
          <div className="bmi-label">Normal Weight</div>
        </div>
        <div className="bmi-scale">
          <div className="bmi-category underweight">
            <div className="category-label">Underweight</div>
            <div className="category-range">&lt;18.5</div>
          </div>
          <div className="bmi-category normal">
            <div className="category-label">Normal</div>
            <div className="category-range">18.5-24.9</div>
          </div>
          <div className="bmi-category overweight">
            <div className="category-label">Overweight</div>
            <div className="category-range">25-29.9</div>
          </div>
          <div className="bmi-category obese">
            <div className="category-label">Obese</div>
            <div className="category-range">&gt;30</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const NutritionPlan = () => (
    <div className="nutrition-container">
      <h2>Your Personalized Nutrition Plan</h2>
      <div className="nutrition-content">
        <div className="nutrition-summary">
          <div className="nutrition-metric">
            <div className="metric-value">2300</div>
            <div className="metric-label">Daily Calories</div>
          </div>
          <div className="nutrition-metric">
            <div className="metric-value">175g</div>
            <div className="metric-label">Protein</div>
          </div>
          <div className="nutrition-metric">
            <div className="metric-value">65g</div>
            <div className="metric-label">Fat</div>
          </div>
          <div className="nutrition-metric">
            <div className="metric-value">260g</div>
            <div className="metric-label">Carbs</div>
          </div>
        </div>
        <div className="meal-plans">
          <h3>Today's Meal Plan</h3>
          <Card>
            <CardHeader>
              <CardTitle>Breakfast (8:00 AM)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="meal-items">
                <li>Oatmeal with berries (300 cal)</li>
                <li>Greek yogurt (120 cal)</li>
                <li>Black coffee (5 cal)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Lunch (12:30 PM)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="meal-items">
                <li>Grilled chicken salad (450 cal)</li>
                <li>Whole grain bread (120 cal)</li>
                <li>Apple (80 cal)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const WorkoutRecommendations = () => (
    <div className="workout-container">
      <h2>Your Personalized Workout Plan</h2>
      <div className="workout-content">
        <Card className="workout-card">
          <CardHeader>
            <CardTitle>Upper Body Focus</CardTitle>
            <CardDescription>Today's Workout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="exercise-list">
              <div className="exercise-item">
                <div className="exercise-name">Bench Press</div>
                <div className="exercise-details">3 sets × 10 reps</div>
              </div>
              <div className="exercise-item">
                <div className="exercise-name">Shoulder Press</div>
                <div className="exercise-details">3 sets × 12 reps</div>
              </div>
              <div className="exercise-item">
                <div className="exercise-name">Pull-ups</div>
                <div className="exercise-details">3 sets × 8 reps</div>
              </div>
              <div className="exercise-item">
                <div className="exercise-name">Tricep Dips</div>
                <div className="exercise-details">3 sets × 15 reps</div>
              </div>
            </div>
            <Button className="start-workout-button">Start Workout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const LiveMovementDetection = () => (
    <div className="movement-container">
      <h2>Live Movement Detection</h2>
      <div className="camera-placeholder">
        <IconCamera />
        <p>Camera feed will appear here</p>
        <Button>Enable Camera</Button>
      </div>
      <div className="movement-stats">
        <div className="stat-item">
          <div className="stat-label">Form Quality</div>
          <div className="stat-value">Good</div>
          <Progress value={75} />
        </div>
        <div className="stat-item">
          <div className="stat-label">Repetitions</div>
          <div className="stat-value">12</div>
        </div>
      </div>
    </div>
  );

  const FoodScan = () => (
    <div className="foodscan-container">
      <h2>Food Scanner</h2>
      <div className="camera-placeholder">
        <IconCamera />
        <p>Scan your food to get nutritional information</p>
        <Button>Scan Food</Button>
      </div>
      <div className="recent-scans">
        <h3>Recent Scans</h3>
        <div className="scan-item">
          <div className="scan-image"></div>
          <div className="scan-details">
            <div className="scan-name">Apple</div>
            <div className="scan-nutrition">80 calories, 0g fat, 21g carbs</div>
          </div>
        </div>
      </div>
    </div>
  );

  const UserProfile = () => (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <IconUser />
        </div>
        <div className="profile-info">
          <h2>{userData?.name || "Guest User"}</h2>
          <p>{userData ? `${userData.age} years, ${userData.weight}kg, ${userData.height}cm` : "Welcome!"}</p>
        </div>
      </div>
      <div className="profile-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" defaultValue={userData?.name} />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" defaultValue={userData?.age} />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" defaultValue={userData?.weight} />
        </div>
        <div className="form-group">
          <label>Height (cm)</label>
          <input type="number" defaultValue={userData?.height} />
        </div>
        <Button className="save-profile-button">Save Profile</Button>
      </div>
    </div>
  );

  const SettingsPanel = () => (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-option">
        <div className="option-label">
          <IconSun />
          <span>Theme</span>
        </div>
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-slider ${theme === 'dark' ? 'dark' : 'light'}`}>
            <div className="toggle-knob"></div>
          </div>
          <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>
      <div className="settings-option">
        <div className="option-label">
          <IconSettings />
          <span>Notifications</span>
        </div>
        <div className="theme-toggle">
          <div className="toggle-slider active">
            <div className="toggle-knob"></div>
          </div>
          <span>Enabled</span>
        </div>
      </div>
    </div>
  );

  // Dashboard content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <div className="metrics-grid">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="metric-value">8,642</div>
                  <p className="metric-change">+20% from yesterday</p>
                  <Progress value={72} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Calories Burned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="metric-value">2,350</div>
                  <p className="metric-change">+15% from yesterday</p>
                  <Progress value={65} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="metric-value">5/7</div>
                  <p className="metric-change">This week</p>
                  <Progress value={71} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Workout Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="metric-value">12 days</div>
                  <p className="metric-change">Keep it up!</p>
                  <Progress value={85} />
                </CardContent>
              </Card>
            </div>

            <div className="dashboard-widgets">
              <BmiCalculator userData={userData} />
              <Card className="schedule-card">
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your planned activities for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="schedule-items">
                    <div className="schedule-item">
                      <div className="schedule-icon workout">
                        <IconDumbbell />
                      </div>
                      <div className="schedule-details">
                        <div className="schedule-title">Upper Body Workout</div>
                        <div className="schedule-time">7:00 AM - 8:00 AM</div>
                      </div>
                      <Button>Start</Button>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-icon food">
                        <IconUtensils />
                      </div>
                      <div className="schedule-details">
                        <div className="schedule-title">Protein-Rich Breakfast</div>
                        <div className="schedule-time">8:30 AM - 9:00 AM</div>
                      </div>
                      <Button>View</Button>
                    </div>
                    <div className="schedule-item">
                      <div className="schedule-icon activity">
                        <IconActivity />
                      </div>
                      <div className="schedule-details">
                        <div className="schedule-title">Afternoon Walk</div>
                        <div className="schedule-time">12:30 PM - 1:00 PM</div>
                      </div>
                      <Button>Start</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "nutrition":
        return <NutritionPlan />;
      case "workout":
        return <WorkoutRecommendations />;
      case "movement":
        return <LiveMovementDetection />;
      case "foodscan":
        return <FoodScan />;
      case "profile":
        return <UserProfile />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className={`app-container ${theme === "light" ? "light-mode" : "dark-mode"}`}>
      <div className="dashboard">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <div className="logo">Working Help Health</div>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
              <IconX />
            </button>
          </div>

          <div className="sidebar-content">
            <div className="user-profile-mini">
              <div className="user-avatar">
                <IconUser />
              </div>
              <div className="user-info">
                <p className="user-name">{userData?.name || "Guest User"}</p>
                <p className="user-details">
                  {userData ? `${userData.age} years, ${userData.weight}kg` : "Welcome!"}
                </p>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <IconHome />
                <span>Dashboard</span>
              </button>

              <button
                className={`nav-item ${activeTab === "nutrition" ? "active" : ""}`}
                onClick={() => setActiveTab("nutrition")}
              >
                <IconUtensils />
                <span>Nutrition Plan</span>
              </button>

              <button
                className={`nav-item ${activeTab === "workout" ? "active" : ""}`}
                onClick={() => setActiveTab("workout")}
              >
                <IconDumbbell />
                <span>Workout Recommendations</span>
              </button>

              <button
                className={`nav-item ${activeTab === "movement" ? "active" : ""}`}
                onClick={() => setActiveTab("movement")}
              >
                <IconActivity />
                <span>Live Movement Detection</span>
              </button>

              <button
                className={`nav-item ${activeTab === "foodscan" ? "active" : ""}`}
                onClick={() => setActiveTab("foodscan")}
              >
                <IconCamera />
                <span>Food Scan</span>
              </button>

              <button
                className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <IconUser />
                <span>Profile</span>
              </button>

              <button
                className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <IconSettings />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="content-header">
            <div className="header-left">
              {!sidebarOpen && (
                <button className="menu-button" onClick={() => setSidebarOpen(true)}>
                  <IconMenu />
                </button>
              )}
              <h1 className="page-title">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "nutrition" && "Nutrition Plan"}
                {activeTab === "workout" && "Workout Recommendations"}
                {activeTab === "movement" && "Live Movement Detection"}
                {activeTab === "foodscan" && "Food Scan"}
                {activeTab === "profile" && "Profile"}
                {activeTab === "settings" && "Settings"}
              </h1>
            </div>
            <div className="header-right">
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </button>
            </div>
          </header>

          <main className="dashboard-main">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;