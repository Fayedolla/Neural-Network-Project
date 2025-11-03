# 🧪 Test Cases for Report

Use these test cases to generate screenshots and analysis for your report. You need **at least 5 combinations per algorithm** showing both good and bad performance.

---

## 🔵 Perceptron Test Cases

### Test Case 1: Good Performance Expected
**Configuration:**
- Feature 1: `body_mass`
- Feature 2: `beak_length`
- Class 1: `A`
- Class 2: `B`
- Learning Rate: `0.01`
- Epochs: `100`
- Use Bias: ✅ Checked
- Algorithm: `Perceptron`

**Expected Outcome:** High accuracy (good feature discrimination)

**Screenshots to Capture:**
1. Configuration panel
2. Training progress chart
3. Decision boundary visualization
4. Confusion matrix and accuracy

**Analysis Points:**
- How well do body_mass and beak_length separate classes A and B?
- Did the perceptron converge (errors reach 0)?
- What's the final accuracy?
- Is the decision boundary clear?

---

### Test Case 2: Moderate Performance Expected
**Configuration:**
- Feature 1: `beak_depth`
- Feature 2: `fin_length`
- Class 1: `A`
- Class 2: `C`
- Learning Rate: `0.05`
- Epochs: `50`
- Use Bias: ✅ Checked
- Algorithm: `Perceptron`

**Expected Outcome:** Moderate accuracy

**Analysis Points:**
- Do these features discriminate well between A and C?
- Effect of higher learning rate (0.05 vs 0.01)
- Did fewer epochs affect performance?

---

### Test Case 3: Testing Without Bias
**Configuration:**
- Feature 1: `body_mass`
- Feature 2: `beak_depth`
- Class 1: `B`
- Class 2: `C`
- Learning Rate: `0.01`
- Epochs: `100`
- Use Bias: ❌ Unchecked
- Algorithm: `Perceptron`

**Expected Outcome:** May have lower accuracy without bias

**Analysis Points:**
- Effect of removing bias term
- How does decision boundary change?
- Does the boundary pass through origin?

---

### Test Case 4: Poor Performance Expected (Gender Feature)
**Configuration:**
- Feature 1: `gender`
- Feature 2: `body_mass`
- Class 1: `A`
- Class 2: `B`
- Learning Rate: `0.01`
- Epochs: `100`
- Use Bias: ✅ Checked
- Algorithm: `Perceptron`

**Expected Outcome:** Lower accuracy (gender may not discriminate well)

**Analysis Points:**
- Is gender a good discriminator?
- How scattered are the points?
- Why might this combination perform poorly?

---

### Test Case 5: High Epochs Test
**Configuration:**
- Feature 1: `beak_length`
- Feature 2: `beak_depth`
- Class 1: `A`
- Class 2: `C`
- Learning Rate: `0.001`
- Epochs: `500`
- Use Bias: ✅ Checked
- Algorithm: `Perceptron`

**Expected Outcome:** Should converge with smaller learning rate

**Analysis Points:**
- Effect of very small learning rate
- Does it need more epochs to converge?
- Training progress curve shape

---

## 🟢 Adaline Test Cases

### Test Case 6: Good Performance Expected
**Configuration:**
- Feature 1: `body_mass`
- Feature 2: `beak_length`
- Class 1: `A`
- Class 2: `B`
- Learning Rate: `0.001`
- Epochs: `100`
- MSE Threshold: `0.01`
- Use Bias: ✅ Checked
- Algorithm: `Adaline`

**Expected Outcome:** High accuracy with early stopping

**Screenshots to Capture:**
1. Configuration panel
2. MSE progress chart
3. Decision boundary visualization
4. Confusion matrix and accuracy

**Analysis Points:**
- Did Adaline reach MSE threshold before max epochs?
- How smooth is the MSE curve?
- Compare accuracy to Perceptron Test Case 1

---

### Test Case 7: Testing Different Learning Rate
**Configuration:**
- Feature 1: `fin_length`
- Feature 2: `body_mass`
- Class 1: `A`
- Class 2: `C`
- Learning Rate: `0.0001`
- Epochs: `200`
- MSE Threshold: `0.05`
- Use Bias: ✅ Checked
- Algorithm: `Adaline`

**Expected Outcome:** Very slow convergence

**Analysis Points:**
- Effect of very small learning rate
- Does MSE decrease smoothly?
- Number of epochs before threshold reached

---

### Test Case 8: Loose MSE Threshold
**Configuration:**
- Feature 1: `beak_depth`
- Feature 2: `beak_length`
- Class 1: `B`
- Class 2: `C`
- Learning Rate: `0.001`
- Epochs: `100`
- MSE Threshold: `0.5`
- Use Bias: ✅ Checked
- Algorithm: `Adaline`

**Expected Outcome:** Stops very early

**Analysis Points:**
- Effect of loose MSE threshold (0.5)
- Did it stop too early?
- How does this affect accuracy?

---

### Test Case 9: Without Bias (Adaline)
**Configuration:**
- Feature 1: `body_mass`
- Feature 2: `fin_length`
- Class 1: `A`
- Class 2: `B`
- Learning Rate: `0.001`
- Epochs: `100`
- MSE Threshold: `0.01`
- Use Bias: ❌ Unchecked
- Algorithm: `Adaline`

**Expected Outcome:** Different decision boundary

**Analysis Points:**
- Compare with bias vs without bias
- Effect on accuracy
- Decision boundary orientation

---

### Test Case 10: Aggressive Learning Rate
**Configuration:**
- Feature 1: `beak_length`
- Feature 2: `beak_depth`
- Class 1: `A`
- Class 2: `C`
- Learning Rate: `0.01`
- Epochs: `100`
- MSE Threshold: `0.01`
- Use Bias: ✅ Checked
- Algorithm: `Adaline`

**Expected Outcome:** May oscillate or diverge

**Analysis Points:**
- Is learning rate too high for Adaline?
- Does MSE decrease smoothly or oscillate?
- Effect on convergence

---

## 📊 Additional Test Suggestions

### For More Examples:

#### Good Performance Combinations:
1. **body_mass + beak_length** → Usually discriminates well
2. **fin_length + body_mass** → Strong physical features
3. **beak_depth + fin_length** → Morphological features

#### Poor Performance Combinations:
1. **gender + any feature** → Gender alone may not discriminate well
2. **beak_depth + beak_length** (some class pairs) → May overlap

#### Interesting Comparisons:
1. **Same features, different classes** → See which class pairs are easier
2. **Same features, different algorithms** → Compare Perceptron vs Adaline
3. **Same features, different learning rates** → See convergence behavior

---

## 📝 For Each Test Case, Document:

### 1. Configuration Details
```
Algorithm: [Perceptron/Adaline]
Features: [feature1] vs [feature2]
Classes: [class1] vs [class2]
Learning Rate: [value]
Epochs: [value]
MSE Threshold: [value] (for Adaline)
Bias: [Yes/No]
```

### 2. Results
```
Final Accuracy: [percentage]%
Final Error/MSE: [value]
Epochs Run: [number]
Confusion Matrix:
  TP: [value]  FP: [value]
  FN: [value]  TN: [value]
```

### 3. Analysis (Write 2-3 paragraphs)
- How well did the features discriminate?
- Was the performance good or poor? Why?
- What does the decision boundary look like?
- How did the hyperparameters affect results?
- Any interesting observations?

### 4. Screenshots
- Configuration panel showing all settings
- Training progress chart (clear and readable)
- Decision boundary with scattered points
- Confusion matrix table
- Accuracy display

---

## 🎯 Report Structure Suggestion

### Introduction
- Brief description of Perceptron and Adaline
- Dataset description (birds.csv)
- Project objectives

### Methodology
- Data preprocessing (gender encoding)
- Train/test split (30/20)
- Algorithms implementation

### Experiments & Results

#### Perceptron Results
- Test Case 1 (with screenshots and analysis)
- Test Case 2 (with screenshots and analysis)
- Test Case 3 (with screenshots and analysis)
- Test Case 4 (with screenshots and analysis)
- Test Case 5 (with screenshots and analysis)

#### Adaline Results
- Test Case 6 (with screenshots and analysis)
- Test Case 7 (with screenshots and analysis)
- Test Case 8 (with screenshots and analysis)
- Test Case 9 (with screenshots and analysis)
- Test Case 10 (with screenshots and analysis)

### Comparison & Analysis
- Perceptron vs Adaline performance
- Best feature combinations
- Effect of hyperparameters
- Good vs poor performance examples

### Conclusion
- Which features achieved highest accuracy?
- Key findings and insights
- Recommendations

### Appendix
- Code snippets (if required)
- Additional screenshots

---

## ✅ Checklist Before Submission

- [ ] Tested at least 5 combinations for Perceptron
- [ ] Tested at least 5 combinations for Adaline
- [ ] Captured clear screenshots for each test
- [ ] Written analysis for each test case
- [ ] Identified best feature combinations
- [ ] Identified worst feature combinations
- [ ] Compared Perceptron vs Adaline
- [ ] Analyzed effect of hyperparameters
- [ ] Report includes all required sections
- [ ] Screenshots are clear and readable
- [ ] All code files included in .rar
- [ ] Dataset included in .rar
- [ ] README documentation included

---

## 🚀 Pro Tips

1. **Take High-Quality Screenshots**
   - Use full screen or zoom appropriately
   - Ensure text is readable
   - Capture the complete visualization

2. **Write Detailed Analysis**
   - Don't just describe what you see
   - Explain WHY the results occurred
   - Connect to theory (step function, gradient descent, etc.)

3. **Compare Results**
   - Same features with different algorithms
   - Same algorithm with different features
   - Effect of bias/no bias

4. **Be Honest**
   - Show both good AND bad results
   - Explain why some combinations fail
   - Discuss limitations

5. **Highlight Insights**
   - Which features are most discriminative?
   - When does Adaline outperform Perceptron?
   - Effect of learning rate on convergence

---

Good luck with testing and report writing! 📚✨
