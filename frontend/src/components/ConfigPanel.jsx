import { useState } from 'react'

function ConfigPanel({ features, classes, onTrain, loading }) {
  const [config, setConfig] = useState({
    feature1: '',
    feature2: '',
    class1: '',
    class2: '',
    learning_rate: 0.01,
    epochs: 100,
    mse_threshold: 0.01,
    use_bias: true,
    algorithm: 'perceptron'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!config.feature1 || !config.feature2) {
      alert('Please select two features')
      return
    }
    
    if (config.feature1 === config.feature2) {
      alert('Please select different features')
      return
    }
    
    if (!config.class1 || !config.class2) {
      alert('Please select two classes')
      return
    }
    
    if (config.class1 === config.class2) {
      alert('Please select different classes')
      return
    }
    
    onTrain(config)
  }

  return (
    <div className="panel">
      <h2>⚙️ Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Feature 1:</label>
          <select
            value={config.feature1}
            onChange={(e) => setConfig({...config, feature1: e.target.value})}
          >
            <option value="">Select Feature 1</option>
            {features.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Feature 2:</label>
          <select
            value={config.feature2}
            onChange={(e) => setConfig({...config, feature2: e.target.value})}
          >
            <option value="">Select Feature 2</option>
            {features.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class 1 (C1):</label>
          <select
            value={config.class1}
            onChange={(e) => setConfig({...config, class1: e.target.value})}
          >
            <option value="">Select Class 1</option>
            {classes.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class 2 (C2):</label>
          <select
            value={config.class2}
            onChange={(e) => setConfig({...config, class2: e.target.value})}
          >
            <option value="">Select Class 2</option>
            {classes.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Learning Rate (η):</label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            max="1"
            value={config.learning_rate}
            onChange={(e) => setConfig({...config, learning_rate: parseFloat(e.target.value)})}
          />
        </div>

        <div className="form-group">
          <label>Number of Epochs (m):</label>
          <input
            type="number"
            min="1"
            max="10000"
            value={config.epochs}
            onChange={(e) => setConfig({...config, epochs: parseInt(e.target.value)})}
          />
        </div>

        <div className="form-group">
          <label>MSE Threshold (for Adaline):</label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            max="10"
            value={config.mse_threshold}
            onChange={(e) => setConfig({...config, mse_threshold: parseFloat(e.target.value)})}
          />
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="bias"
              checked={config.use_bias}
              onChange={(e) => setConfig({...config, use_bias: e.target.checked})}
            />
            <label htmlFor="bias">Use Bias</label>
          </div>
        </div>

        <div className="form-group">
          <label>Algorithm:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="perceptron"
                name="algorithm"
                value="perceptron"
                checked={config.algorithm === 'perceptron'}
                onChange={(e) => setConfig({...config, algorithm: e.target.value})}
              />
              <label htmlFor="perceptron">Perceptron</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="adaline"
                name="algorithm"
                value="adaline"
                checked={config.algorithm === 'adaline'}
                onChange={(e) => setConfig({...config, algorithm: e.target.value})}
              />
              <label htmlFor="adaline">Adaline</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Training...' : 'Train Model'}
        </button>
      </form>
    </div>
  )
}

export default ConfigPanel
