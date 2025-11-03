import { useState } from 'react'
import axios from 'axios'

function ClassifyPanel({ data, apiUrl }) {
  const [sample, setSample] = useState({
    feature1: '',
    feature2: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClassify = async (e) => {
    e.preventDefault()
    
    if (!sample.feature1 || !sample.feature2) {
      alert('Please enter values for both features')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/classify`, {
        sample: [parseFloat(sample.feature1), parseFloat(sample.feature2)]
      })
      
      setPrediction(response.data.prediction)
    } catch (error) {
      console.error('Error classifying sample:', error)
      alert('Error classifying sample: ' + (error.response?.data?.detail || error.message))
    } finally {
      setLoading(false)
    }
  }

  const getPredictedClass = () => {
    if (prediction === null) return null
    return prediction === 1 ? data.class_names[0] : data.class_names[1]
  }

  return (
    <div className="panel" style={{ marginTop: '20px' }}>
      <h2>🔍 Classify Single Sample</h2>
      <form onSubmit={handleClassify}>
        <div className="form-group">
          <label>{data.feature_names[0]}:</label>
          <input
            type="number"
            step="any"
            value={sample.feature1}
            onChange={(e) => setSample({...sample, feature1: e.target.value})}
            placeholder={`Enter ${data.feature_names[0]}`}
          />
        </div>

        <div className="form-group">
          <label>{data.feature_names[1]}:</label>
          <input
            type="number"
            step="any"
            value={sample.feature2}
            onChange={(e) => setSample({...sample, feature2: e.target.value})}
            placeholder={`Enter ${data.feature_names[1]}`}
          />
        </div>

        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify Sample'}
        </button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <div className="prediction-value">
            Class: <strong>{getPredictedClass()}</strong>
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
            Raw prediction: {prediction}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassifyPanel
