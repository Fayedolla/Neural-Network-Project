import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'

function VisualizationPanel({ data, trainingResults }) {
  const prepareTrainingData = () => {
    return trainingResults.training_progress.map((value, index) => ({
      epoch: index + 1,
      value: value
    }))
  }

  const prepareScatterData = () => {
    const class1Points = []
    const class2Points = []
    
    data.all_X.forEach((point, idx) => {
      const dataPoint = {
        x: point[0],
        y: point[1]
      }
      if (data.all_y[idx] === 1) {
        class1Points.push(dataPoint)
      } else {
        class2Points.push(dataPoint)
      }
    })
    
    return { class1Points, class2Points }
  }

  const calculateDecisionBoundary = () => {
    const weights = trainingResults.weights
    const bias = trainingResults.bias
    
    // Get x range from data
    const allX = data.all_X.map(p => p[0])
    const minX = Math.min(...allX)
    const maxX = Math.max(...allX)
    
    // Calculate y values for decision boundary: w1*x1 + w2*x2 + b = 0
    // x2 = -(w1*x1 + b) / w2
    const x1 = minX
    const x2 = maxX
    const y1 = -(weights[0] * x1 + bias) / weights[1]
    const y2 = -(weights[0] * x2 + bias) / weights[1]
    
    return [
      { x: x1, y: y1 },
      { x: x2, y: y2 }
    ]
  }

  const { class1Points, class2Points } = prepareScatterData()
  const boundaryPoints = calculateDecisionBoundary()

  return (
    <div className="panel">
      <h2>📊 Visualization</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>
          Training Progress (Errors/MSE per Epoch)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={prepareTrainingData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Error/MSE', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#667eea" strokeWidth={2} name="Error/MSE" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>
          Decision Boundary Visualization
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={data.feature_names[0]} label={{ value: data.feature_names[0], position: 'insideBottom', offset: -5 }} />
            <YAxis type="number" dataKey="y" name={data.feature_names[1]} label={{ value: data.feature_names[1], angle: -90, position: 'insideLeft' }} />
            <ZAxis range={[100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name={data.class_names[0]} data={class1Points} fill="#8884d8" />
            <Scatter name={data.class_names[1]} data={class2Points} fill="#82ca9d" />
            <Scatter name="Decision Boundary" data={boundaryPoints} fill="#ff0000" line shape="line" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="model-params">
        <h4>⚙️ Model Parameters</h4>
        <div className="params-grid">
          <div className="param-item">
            <span className="param-label">Weights:</span>
            <span className="param-value">[{trainingResults.weights.map(w => w.toFixed(4)).join(', ')}]</span>
          </div>
          <div className="param-item">
            <span className="param-label">Bias:</span>
            <span className="param-value">{trainingResults.bias.toFixed(4)}</span>
          </div>
          <div className="param-item">
            <span className="param-label">Final Error/MSE:</span>
            <span className="param-value">{trainingResults.training_progress[trainingResults.training_progress.length - 1].toFixed(4)}</span>
          </div>
          <div className="param-item">
            <span className="param-label">Epochs Trained:</span>
            <span className="param-value">{trainingResults.training_progress.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualizationPanel
