import Nav from '../components/nav'
import { useState } from 'react'

const OnBoarding = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: []

  })

  const handleSubmit = (e) => {
    console.log('submitted')
  }

  const handleChange = (e) => {
    console.log('e', e)
  }

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {
        }}
        showModal={false}
      />

      <div className="onboarding">
        <h2>CREATE ACCOUNT TODAY!</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type='text'
              name="firstName"
              placeholder="First Name"
              required={true}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="userInfo">
              <input
                id="DOBmonth"
                type="number"
                name="DOBmonth"
                placeholder="MM"
                required={true}
                onChange={handleChange}
              />
              <input
                id="DOBday"
                type="number"
                name="DOBday"
                placeholder="DD"
                required={true}
                onChange={handleChange}
              />

              <input
                id="DOByear"
                type="number"
                name="DOByear"
                placeholder="YY"
                required={true}
                onChange={handleChange}
              />
            </div>

            <label>Gender Identity</label>
            <div className="userInfo">
              <input
                id="man"
                type="radio"
                name="genderID"
                value="manUser"
                onChange={handleChange}
              />
              <label htmlFor="man">Man</label>
              <input
                id="woman"
                type="radio"
                name="genderID"
                value="womanUser"
                onChange={handleChange}
              />
              <label htmlFor="woman">Woman</label>
              <input
                id="nonbinary"
                type="radio"
                name="genderID"
                value="nonbinaryUser"
                onChange={handleChange}
              />
              <label htmlFor="nonbinary">Non-binary</label>
              <input
                id="otherGender"
                type="radio"
                name="genderID"
                value="otherGenderUser"
                onChange={handleChange}
              />
              <label htmlFor="otherGender">Other</label>
            </div>
            <label htmlFor="showGender">Do you want your gender to be public to other users?</label>
            <div className="userInfo">
              <input
                id="YesPublicGender"
                type="radio"
                name="genderPublic"
                value="YesPublic"
                onChange={handleChange}
              />
              <label htmlFor="YesPublicGender">Yes</label>
              <input
                id="NoPublicGender"
                type="radio"
                name="genderPublic"
                value="NoPublic"
                onChange={handleChange}
              />
              <label htmlFor="NoPublicGender">No</label>
            </div>

            <label htmlFor="universityInfo">What year are you?</label>
            <div className="userInfo">
              <input
                id="freshman"
                type="radio"
                name="classYear"
                value="fresh"
                onChange={handleChange}
              />
              <label htmlFor="freshman">First Year</label>
              <input
                id="sophmore"
                type="radio"
                name="classYear"
                value="soph"
                onChange={handleChange}
              />
              <label htmlFor="sophmore">Second Year</label>
              <input
                id="junior"
                type="radio"
                name="classYear"
                value="jun"
                onChange={handleChange}
              />
              <label htmlFor="junior">Third Year</label>
              <input
                id="senior"
                type="radio"
                name="classYear"
                value="sen"
                onChange={handleChange}
              />
              <label htmlFor="senior">Fourth Year</label>
              <input
                id="supSenior"
                type="radio"
                name="classYear"
                value="supSen"
                onChange={handleChange}
              />
              <label htmlFor="supSenior">5+ year</label>
            </div>
            <label htmlFor="about">My Major</label>
            <input
              id="major"
              type="text"
              name="major"
              required={true}
              placeholder="I am studying..."
              onChange={handleChange}
            />

            
<label htmlFor="universityInfo">What are your interests?</label>
            <div className="userInterests">
            <input
                id="LiveMusic "
                type="checkbox"
                name="interests"
                value="LiveMus"
                onChange={handleChange}
              />
              <label htmlFor="LiveMusic">Live Music</label>
              <input
                id="Baking"
                type="checkbox"
                name="interests"
                value="bake"
                onChange={handleChange}
              />
              <label htmlFor="Baking">Baking</label>
              <input
                id="Crocheting"
                type="checkbox"
                name="interests"
                value="crochet"
                onChange={handleChange}
              />
              <label htmlFor="Crocheting">Crocheting</label>
              <input
                id="Gymming"
                type="checkbox"
                name="interests"
                value="gym"
                onChange={handleChange}
              />
              <label htmlFor="Gymming">Working out</label>
              <input
                id="SportsWatching"
                type="checkbox"
                name="interests"
                value="sports"
                onChange={handleChange}
              />
              <label htmlFor="SportsWatching">Watching Sports</label>
              <input
                id="NewMovies"
                type="checkbox"
                name="interests"
                value="movies"
                onChange={handleChange}
              />
              <label htmlFor="NewMovies">Movies</label>
              <input
                id="VideoGames"
                type="checkbox"
                name="interests"
                value="games"
                onChange={handleChange}
              />
              <label htmlFor="VideoGames">Video Games</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I enjoy doing..."
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>

            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
            </div>

          </section>

        </form>
      </div>
    </>
  )
}
export default OnBoarding