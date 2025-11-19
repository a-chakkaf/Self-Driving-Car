# 🚗 Self-Driving Car Simulation

A JavaScript-based self-driving car simulation that uses neural networks and genetic algorithms to train autonomous vehicles to navigate through traffic.

![Self-Driving Car](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Neural Network](https://img.shields.io/badge/AI-Neural%20Network-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

This project demonstrates a self-driving car system that learns to navigate a multi-lane road while avoiding traffic obstacles. The cars use:
- **Sensor-based perception** to detect road boundaries and nearby vehicles
- **Neural network decision-making** for autonomous control
- **Genetic algorithm evolution** to improve performance over generations

## ✨ Features

- **Real-time Physics Simulation**: Realistic car movement with acceleration, friction, and steering dynamics
- **Ray-Casting Sensors**: 5-ray sensor system to detect obstacles and road boundaries
- **Neural Network Brain**: Multi-layer perceptron with customizable architecture (5 inputs → 6 hidden → 4 outputs)
- **Parallel Training**: Simultaneously trains 100 AI cars to find the best performer
- **Live Network Visualization**: Real-time visualization of neural network weights and activations
- **Save/Load Functionality**: Persist the best-performing brain for future use
- **Traffic Simulation**: Dynamic traffic with varying speeds on multiple lanes

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (e.g., Live Server, Python's http.server, or Node's http-server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/a-chakkaf/self-driving-car.git
cd self-driving-car
```

2. Start a local web server. Choose one of these options:

**Option 1: Using VS Code Live Server**
- Install the Live Server extension
- Right-click on `index.html` and select "Open with Live Server"

**Option 2: Using Python**
```bash
python -m http.server 5500
```

**Option 3: Using Node.js**
```bash
npx http-server -p 5500
```

3. Open your browser and navigate to:
```
http://localhost:5500
```

## 🎮 How to Use

### Training Mode

1. **Launch the simulation** - The cars will start training automatically
2. **Observe the best performer** - The lead car (shown in full opacity) is the current best
3. **Save the best brain** - Click the "save" button to store the best-performing neural network
4. **Discard progress** - Click "discard" to reset and start fresh training

### Controls

- **Arrow Keys**: Manual control (when using "KEYS" control type)
  - ↑: Forward
  - ↓: Reverse
  - ←: Turn Left
  - →: Turn Right

### Understanding the Visualization

**Left Canvas (Car View)**
- **Black cars (transparent)**: The population of AI cars being trained
- **Black car (solid)**: The best-performing car from the current generation
- **Blue cars**: Traffic obstacles with varying speeds
- **Yellow rays**: Active sensor rays detecting obstacles
- **Black rays**: Sensor rays that haven't detected anything

**Right Canvas (Neural Network)**
- **Bottom layer**: Sensor inputs (5 rays)
- **Middle layer**: Hidden neurons (6 nodes)
- **Top layer**: Outputs (↑ Forward, ← Left, → Right, ↓ Reverse)
- **Connection colors**:
  - Yellow/White: Positive weights
  - Blue/Purple: Negative weights
  - Line thickness: Weight magnitude
- **Node colors**: Current activation levels

## 🧠 Architecture

### Project Structure

```
self-driving-car/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── main.js             # Main application logic and animation loop
├── car.js              # Car class with physics and rendering
├── sensor.js           # Ray-casting sensor implementation
├── network.js          # Neural network and learning algorithms
├── controls.js         # Control system (AI, keyboard, dummy)
├── road.js             # Road rendering and lane management
├── visualizer.js       # Neural network visualization
├── utiles.js           # Utility functions (lerp, intersection detection)
└── README.md           # This file
```

### Neural Network Architecture

```
Input Layer (5 neurons)
    ↓
Hidden Layer (6 neurons)
    ↓
Output Layer (4 neurons)
    ↓
[Forward, Left, Right, Reverse]
```

**Input**: Normalized sensor readings (0 = no obstacle, 1 = obstacle very close)
**Output**: Control signals for car movement (values 0-1)

### Key Components

#### 1. **Car Class** (`car.js`)
- Physics simulation (acceleration, friction, steering)
- Collision detection using polygon intersection
- Sensor integration
- Neural network brain integration

#### 2. **Sensor Class** (`sensor.js`)
- Ray-casting collision detection
- 5 rays spread across 90° field of view
- 150-pixel detection range
- Detects both road borders and traffic

#### 3. **Neural Network** (`network.js`)
- Feedforward propagation
- Random weight initialization
- Mutation-based learning (genetic algorithm)
- Serialization for save/load

#### 4. **Control System** (`controls.js`)
- AI mode: Neural network-driven
- KEYS mode: Keyboard-controlled
- DUMMY mode: Always moves forward (traffic)

## 🔬 How It Works

### Training Process

1. **Initialization**: 100 cars spawn with random neural networks
2. **Evaluation**: Each car drives until it crashes or gets stuck
3. **Selection**: The car that travels the farthest is considered the best
4. **Mutation**: The best brain is mutated to create the next generation
5. **Iteration**: Process repeats continuously

### Genetic Algorithm

The system uses a simple genetic algorithm:
- **Fitness Function**: Distance traveled (minimizing Y coordinate)
- **Selection**: Elitist (best performer is kept)
- **Mutation**: Weights and biases are randomly adjusted using linear interpolation

```javascript
// Mutation formula
newValue = lerp(currentValue, random(-1, 1), mutationAmount)
```

## 🛠️ Customization

### Adjust Training Parameters

In `main.js`, modify:
```javascript
const N = 100;  // Number of cars to train simultaneously
```

### Modify Neural Network

In `car.js`, change the architecture:
```javascript
this.brain = new NeuralNetwork([
    this.sensor.rayCount,  // Input layer (5)
    6,                      // Hidden layer (change this)
    4                       // Output layer
]);
```

### Adjust Sensor Configuration

In `sensor.js`:
```javascript
this.rayCount = 5;              // Number of rays
this.rayLength = 150;           // Detection distance
this.raySpread = Math.PI / 2;   // Field of view (90°)
```

### Modify Car Physics

In `car.js`:
```javascript
this.accelaration = 0.2;    // Acceleration rate
this.maxSpeed = 3;          // Maximum speed
this.friction = 0.05;       // Friction coefficient
```

## 🎓 Learning Concepts

This project demonstrates:

- **Neural Networks**: Basic feedforward networks and backpropagation alternatives
- **Genetic Algorithms**: Evolution-based optimization
- **Computer Vision**: Ray-casting for environment perception
- **Game Physics**: 2D physics simulation with collision detection
- **Canvas API**: Advanced HTML5 canvas rendering
- **Object-Oriented Programming**: Clean class-based architecture

## 🐛 Troubleshooting

### Common Issues

**Cars not moving:**
- Check browser console for errors
- Ensure all JS files are loaded in the correct order in `index.html`

**"sensor is not defined" error:**
- This has been fixed. The `draw()` method now correctly checks the `drawSensor` parameter

**Slow performance:**
- Reduce the number of cars: `const N = 50;`
- Close the neural network visualization temporarily

**Saved brain not loading:**
- Check browser local storage
- Ensure you clicked "save" after a successful training session

## 📈 Performance Tips

- Start with 50-100 cars for initial training
- Let it run for several minutes to see meaningful progress
- Save frequently when you see good performance
- Reload the page and load the saved brain to continue training
- Traffic patterns affect learning - experiment with different configurations

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the field of autonomous vehicles and reinforcement learning
- Built with vanilla JavaScript for educational purposes
- Uses genetic algorithms as an alternative to gradient-based learning

## 📧 Contact

**Author**: a-chakkaf  
**Repository**: [github.com/a-chakkaf/self-driving-car](https://github.com/a-chakkaf/self-driving-car)

---

⭐ If you found this project interesting, please give it a star!

Happy Training! 🚗💨
