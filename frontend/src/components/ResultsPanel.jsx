function ResultsPanel({ testResults, classNames }) {
  if (!testResults || !testResults.confusion_matrix) {
    return null;
  }

  const { confusion_matrix, accuracy } = testResults;

  return (
    <div className="panel">
      <h2>📈 Test Results</h2>
      
      <div className="confusion-matrix">
        <h3>Confusion Matrix</h3>
        <table className="matrix-table">
          <thead>
            <tr>
              <th></th>
              <th>Predicted {classNames?.[0] || 'Class 1'}</th>
              <th>Predicted {classNames?.[1] || 'Class 2'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Actual {classNames?.[0] || 'Class 1'}</th>
              <td title="True Positives">{confusion_matrix.TP || 0}</td>
              <td title="False Negatives">{confusion_matrix.FN || 0}</td>
            </tr>
            <tr>
              <th>Actual {classNames?.[1] || 'Class 2'}</th>
              <td title="False Positives">{confusion_matrix.FP || 0}</td>
              <td title="True Negatives">{confusion_matrix.TN || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="accuracy-display">
        <h3>Overall Accuracy</h3>
        <div className="accuracy-value">{((accuracy || 0) * 100).toFixed(2)}%</div>
      </div>

      <div className="metrics-breakdown">
        <h4>📊 Metrics Breakdown</h4>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">True Positives</div>
            <div className="metric-value tp">{confusion_matrix.TP || 0}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">True Negatives</div>
            <div className="metric-value tn">{confusion_matrix.TN || 0}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">False Positives</div>
            <div className="metric-value fp">{confusion_matrix.FP || 0}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">False Negatives</div>
            <div className="metric-value fn">{confusion_matrix.FN || 0}</div>
          </div>
        </div>
        <div className="total-samples">
          <strong>Total Test Samples:</strong> {(confusion_matrix.TP || 0) + (confusion_matrix.TN || 0) + (confusion_matrix.FP || 0) + (confusion_matrix.FN || 0)}
        </div>
      </div>
    </div>
  )
}

export default ResultsPanel
