//HELPCENTER JSX
 
import React, { useState } from 'react';
import './Helpcenter.css';
 
const HelpCenter = () => {
  const [issue, setIssue] = useState('');
  const [faqVisibility, setFaqVisibility] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
 
  const handleIssueChange = (event) => {
    setIssue(event.target.value);
  };
 
  const handleSubmit = () => {
    if (!issue.trim()) {
      alert('Please enter your issue before submitting.');
    } else {
      alert(`Issue submitted: ${issue}`);
      setIssue('');
    }
  };
 
  const toggleFaqVisibility = (index) => {
    setFaqVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
 
  const faqData = [
    { question: 'How are you?', answer: 'im not good.' },
    { question: 'what happend?', answer: 'Nothing happend' },
    { question: 'At what time this happen?', answer: 'Nothing happen rey.' },
    { question: 'Are you okey now?', answer: 'im good now.' },
  ];
 
  return (
    <div className="help-center-container">
      <h1>Help Center</h1>
 
      <div className="report-issue">
        <textarea
          placeholder="Report An Issue"
          value={issue}
          onChange={handleIssueChange}
        ></textarea>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
 
      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqData.map((item, index) => (
          <React.Fragment key={index}>
            <div className="faq-item">
              <div
                className="question"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFaqVisibility(index)}
              >
                <h3>Questions</h3>
                <p>{item.question}</p>
              </div>
              <div className="answer" style={{ display: faqVisibility[index] ? 'block' : 'none' }}>
                <h3>Answer</h3>
                <p>{item.answer}</p>
              </div>
            </div>
            {index < faqData.length - 1 && <hr className="faq-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
 
export default HelpCenter;
 