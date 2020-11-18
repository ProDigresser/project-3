import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

// * Common name
// * Scientific name 
// * Image 
// * Dui Decimal
// * Synonyms 
// * Add button 
// * Share button 
// * Wish button
// ? Add User Details

// ? Form to add User details before POSTING to list

// ! STILL TO ADD - WISH LIST ICON

const AddPlant = (props) => {
  const plantData = props.location.state.plant
  const [radioButton, updateRadioButton] = useState()
  const [reducedSynonyms, updateReducedSynonyms] = useState('')

  // * Shortens List of Synonyms
  useEffect(() => {
    let synLimit = 4
    updateReducedSynonyms(plantData.synonyms.map((syn) => {
      if (synLimit > 0) {
        // Makes a list of items
        synLimit--
        return syn + ', '
      } else if (synLimit === 0 ) {
        // If last item add a fullstop
        synLimit--
        return syn + '.'
      }

    }))
    console.log(reducedSynonyms)
    console.log(plantData.synonyms)
  }, [])

  const [formData, updateFormData] = useState({
    image: `${plantData.image_url}`,
    commonName: `${plantData.common_name}`,
    scientificName: `${plantData.scientific_name}`,
    library: `${plantData.bibliography}`,
    synonyms: `${reducedSynonyms}`,
    careNotes: '',
    outdoor: false,
    plantType: ''
  })

  // { console.log(formData) }
  // { console.log(plantData) }

  // Function to take values from the browser and include in formData
  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  // Function to POST data to our API 
  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    axios.post('/api/plants', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const newPlantId = resp.data._id
        props.history.push({ pathname: `/profile-plant/${newPlantId}`, state: { formData } })
        console.log(resp.data._id)
      })
  }

  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
    handleChange(event)
  }

  return <main>
    <section className="cover">
      <h1>Add Plant</h1>
    </section>

    <section className="content">
      <section className="margin">


        <h4>{plantData.scientific_name}</h4>
        <h2>{plantData.common_name}</h2>
        <div className="header-title extra-space">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src="../images/book.svg" alt="message-icon" />
            <h6>{plantData.bibliography}</h6>
          </div>
          <div>
            <img src="../images/share.svg" alt="edit-icon" />
          </div>
        </div>

        <hr className="hr-less-space" />

        <div className="bio">
          <h5>SYNONYMS</h5>
          <p>{reducedSynonyms}</p>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="form-section">
            {radioButton === true ?
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  value={true}
                  name="outdoor">
                  <img src="../images/deer-white.svg" alt="deer" />Outdoor</button>
                <button
                  id="button-radio-grow"
                  className="button-radio "
                  onClick={handleRadioButton}
                  value={false}
                  name="outdoor">
                  <img src="../images/fireplace-green.svg" alt="fireplace" />
              Indoor</button>
              </div>
              :
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}
                  value={true}
                  name="outdoor">
                  <img src="../images/deer-green.svg" alt="deer" />Outdoor</button>
                <button
                  id="button-radio-grow"
                  className="button-radio active"
                  value={false}
                  name="outdoor">
                  <img src="../images/fireplace-white.svg" alt="fireplace" />
              Indoor</button>
              </div>
            }
          </div>
          <div className="form-section">
            <select
              className="plant-type input"
              onChange={handleChange}
              name="plantType">
              <option>Plant Type...</option>
              <option>Bulb</option>
              <option>Cactus/Succulent</option>
              <option>Climber</option>
              <option>Conifer</option>
              <option>Fern</option>
              <option>Fruit</option>
              <option>Herb</option>
              <option>Ornamental</option>
              <option>Grass</option>
              <option>Perennial</option>
              <option>Rose</option>
              <option>Shrub</option>
              <option>Tree</option>
              <option>Palm</option>
              <option>Bamboo</option>
            </select>
          </div>

          <div className="form-section">
            <textarea
              className="input"
              placeholder="Care notes for your plant..."
              onChange={handleChange}
              value={formData.careNotes}
              name="careNotes"
            ></textarea>
          </div>



          <button className="button-green">Add to my list</button>
        </form>


      </section>
    </section>
  </main>
}

export default AddPlant

{/* <div>
    <div>
      <img src={plantData.image_url}></img>
      <h3>{plantData.scientific_name}</h3>
      <h3>{plantData.common_name}</h3>
      <h5>{plantData.bibliography}</h5>
      <h5>SYNONYMS {plantData.synonyms}</h5>
      <textarea
        placeholder="Care notes for your plant..."
        onChange={handleChange}
        value={formData.careNotes}
        name="careNotes"
      ></textarea>
      <button
        onClick={handleChange}
        value={true}
        name="outdoor"
      >outdoor</button>
      <button
        onClick={handleChange}
        value={false}
        name="outdoor">
        Indoor</button>

      <select
        onChange={handleChange}
        name="plantType">
        <option>Plant Type...</option>
        <option>Bulb</option>
        <option>Cactus/Succulent</option>
        <option>Climber</option>
        <option>Conifer</option>
        <option>Fern</option>
        <option>Fruit</option>
        <option>Herb</option>
        <option>Ornamental</option>
        <option>Grass</option>
        <option>Perennial</option>
        <option>Rose</option>
        <option>Shrub</option>
        <option>Tree</option>
        <option>Palm</option>
        <option>Bamboo</option>
      </select>
      <button onClick={handleSubmit}>Add to my list</button>
    </div>
  </div> */}