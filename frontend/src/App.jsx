import { useState, useEffect } from 'react'
import axios from 'axios'
import ConfigPanel from './components/ConfigPanel'
import VisualizationPanel from './components/VisualizationPanel'
import ResultsPanel from './components/ResultsPanel'
import ClassifyPanel from './components/ClassifyPanel'
import './App.css'

const API_URL = 'http://localhost:8000'

function App() {
  const [features, setFeatures] = useState([])
  const [classes, setClasses] = useState([])
  const [trainingResults, setTrainingResults] = useState(null)
  const [testResults, setTestResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchMetadata()
  }, [])

  const fetchMetadata = async () => {
    try {
      const [featuresRes, classesRes] = await Promise.all([
        axios.get(`${API_URL}/features`),
        axios.get(`${API_URL}/classes`)
      ])
      setFeatures(featuresRes.data.features)
      setClasses(classesRes.data.classes)
    } catch (error) {
      console.error('Error fetching metadata:', error)
      alert('Error loading dataset metadata')
    }
  }

  const handleTrain = async (config) => {
    setLoading(true)
    setTrainingResults(null)
    setTestResults(null)
    
    try {
      const response = await axios.post(`${API_URL}/train`, config)
      setTrainingResults(response.data.training_results)
      setData(response.data.data)
      
      // Automatically test the model
      const testResponse = await axios.post(`${API_URL}/test`, {
        test_X: response.data.data.test_X,
        test_y: response.data.data.test_y
      })
      setTestResults(testResponse.data)
      
    } catch (error) {
      console.error('Error training model:', error)
      alert('Error training model: ' + (error.response?.data?.detail || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧠 Neural Network Classifier</h1>
        <p>Perceptron & Adaline Implementation</p>
      </header>
      
      <div className="app-container">
        <div className="left-panel">
          <ConfigPanel 
            features={features}
            classes={classes}
            onTrain={handleTrain}
            loading={loading}
          />
          
          {trainingResults && data && (
            <ClassifyPanel 
              data={data}
              apiUrl={API_URL}
            />
          )}
        </div>
        
        <div className="right-panel">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Training model...</p>
            </div>
          )}
          
          {trainingResults && data && (
            <VisualizationPanel 
              data={data}
              trainingResults={trainingResults}
            />
          )}
          
          {testResults && (
            <ResultsPanel 
              testResults={testResults}
              classNames={data?.class_names}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
