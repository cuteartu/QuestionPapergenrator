import React from 'react';

class SimpleInputs extends React.Component {
  constructor(props) {
    super(props);
    // Try to load from localStorage first, otherwise use defaults
    const savedState = localStorage.getItem('formData');
    this.state = savedState ? JSON.parse(savedState) : {
      name: '',
      email: '',
      gender: 'male',
      subscribe: false,
      interests: {
        sports: false,
        music: false,
        reading: false
      },
      submitted: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInterestChange = this.handleInterestChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidUpdate() {
    // Save to localStorage whenever state changes
    localStorage.setItem('formData', JSON.stringify(this.state));
  }

  handleChange(event) {
    const { name, value, type } = event.target;
    this.setState({
      [name]: type === 'radio' ? value : value,
      submitted: false
    });
  }

  handleCheckboxChange(event) {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked,
      submitted: false
    });
  }

  handleInterestChange(event) {
    const { name, checked } = event.target;
    this.setState(prevState => ({
      interests: {
        ...prevState.interests,
        [name]: checked
      },
      submitted: false
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    console.log('Form submitted:', this.state);
  }

  clearStorage() {
   
    localStorage.clear();
    
    this.setState({
      name: '',
      email: '',
      gender: 'male',
      subscribe: false,
      interests: {
        sports: false,
        music: false,
        reading: false
      },
      submitted: false
    });
  }

  removeItem() {
    
    localStorage.removeItem('formData');
    
    this.setState({
      name: '',
      email: '',
      gender: 'male',
      subscribe: false,
      interests: {
        sports: false,
        music: false,
        reading: false
      },
      submitted: false
    });
  }

  render() {
    // Styles object (added new styles for storage buttons)
    const styles = {
      container: {
        maxWidth: '500px',
        margin: '20px auto',
        padding: '25px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px hsla(0, 33.30%, 80.00%, 0.10)'
      },
      heading: {
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '1.8em'
      },
      inputGroup: {
        marginBottom: '25px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      },
      label: {
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#34495e'
      },
      input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        marginBottom: '10px',
        boxSizing: 'border-box',
        fontSize: '1em',
        transition: 'border 0.3s ease'
      },
      inputFocus: {
        outline: 'none',
        borderColor: '#3498db',
        boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
      },
      radioGroup: {
        margin: '15px 0',
        display: 'flex',
        gap: '20px'
      },
      checkboxContainer: {
        margin: '15px 0',
        display: 'flex',
        alignItems: 'center'
      },
      checkboxLabel: {
        marginLeft: '10px',
        cursor: 'pointer',
        userSelect: 'none'
      },
      valueText: {
        margin: '10px 0 0',
        color: '#7f8c8d',
        fontSize: '0.95em'
      },
      selectedInterests: {
        padding: '12px',
        backgroundColor: '#ecf0f1',
        borderRadius: '6px',
        marginTop: '12px',
        fontSize: '0.95em'
      },
      submitButton: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1.1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '10px'
      },
      submitButtonHover: {
        backgroundColor: '#2980b9'
      },
      storageButton: {
        width: '48%',
        padding: '12px',
        margin: '10px 1%',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.9em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      },
      storageButtonSecondary: {
        backgroundColor: '#95a5a6'
      },
      submissionMessage: {
        textAlign: 'center',
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#2ecc71',
        color: 'white',
        borderRadius: '6px',
        fontWeight: '600',
        display: this.state.submitted ? 'block' : 'none'
      },
      storageInfo: {
        padding: '12px',
        backgroundColor: '#f1c40f',
        color: '#2c3e50',
        borderRadius: '6px',
        marginTop: '20px',
        fontSize: '0.9em',
        textAlign: 'center'
      }
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>User Information Form</h2>
        
        {/* Name Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Enter your full name"
            style={styles.input}
            onFocus={e => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={e => e.target.style = styles.input}
          />
          <p style={styles.valueText}>Current value: {this.state.name || 'Empty'}</p>
        </div>
        
        {/* Email Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Enter your email address"
            style={styles.input}
            onFocus={e => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={e => e.target.style = styles.input}
          />
          <p style={styles.valueText}>Current value: {this.state.email || 'Empty'}</p>
        </div>

        {/* Gender Radio Buttons */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Gender:</label>
          <div style={styles.radioGroup}>
            {['male', 'female', 'other'].map(gender => (
              <label key={gender} style={styles.checkboxContainer}>
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={this.state.gender === gender}
                  onChange={this.handleChange}
                />
                <span style={styles.checkboxLabel}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </span>
              </label>
            ))}
          </div>
          <p style={styles.valueText}>Selected: {this.state.gender}</p>
        </div>

        {/* Newsletter Checkbox */}
        <div style={styles.inputGroup}>
          <label style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="subscribe"
              checked={this.state.subscribe}
              onChange={this.handleCheckboxChange}
            />
            <span style={{...styles.checkboxLabel, fontWeight: '600'}}>
              Subscribe to newsletter
            </span>
          </label>
          <p style={styles.valueText}>
            Status: {this.state.subscribe ? 'Subscribed ✅' : 'Not subscribed ❌'}
          </p>
        </div>

        {/* Interests Checkboxes */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Interests:</label>
          {Object.keys(this.state.interests).map(interest => (
            <label key={interest} style={styles.checkboxContainer}>
              <input
                type="checkbox"
                name={interest}
                checked={this.state.interests[interest]}
                onChange={this.handleInterestChange}
              />
              <span style={styles.checkboxLabel}>
                {interest.charAt(0).toUpperCase() + interest.slice(1)}
              </span>
            </label>
          ))}
          <div style={styles.selectedInterests}>
            <p style={{margin: '0'}}>
              <strong>Selected interests:</strong> {
                Object.keys(this.state.interests)
                  .filter(int => this.state.interests[int])
                  .join(', ') || 'None'
              }
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={this.handleSubmit}
          style={styles.submitButton}
        >
          Submit Form
        </button>

        {/* Storage Controls */}
        <div style={styles.inputGroup}>
          <button
            onClick={this.removeItem}
            style={{...styles.storageButton, ...styles.storageButtonSecondary}}
          >
            Remove Form Data
          </button>
          <button
            onClick={this.clearStorage}
            style={styles.storageButton}
          >
            Clear All Local Storage
          </button>
          <div style={styles.storageInfo}>
            <p>Form data is automatically saved to localStorage</p>
          </div>
        </div>

        {/* Submission Message */}
        <div style={styles.submissionMessage}>
          Form submitted successfully!
        </div>
      </div>
    );
  }
}

export default SimpleInputs;