function App() {
  return (
    <>
      {/* Header */}
      <header>
        <h1>RocketX</h1>
      </header>
      {/* Banner */}
      <section>
        <div>
          <h2>The Title of Your Online Course</h2>
          <h3>Learn how to do things faster and better</h3>
          <p>
            Create a compelling summary of your course content and the key
            benefits for subscribers
          </p>
        </div>
      </section>
      {/* Search Bar */}
      <section>
        <form>
          <input type="text" name="text" placeholder="Search Capsules" />
          <input type="submit" name="submit" value="Search" />
        </form>
      </section>
      {/* Data Grid */}
      <section>
        <div></div>
      </section>
    </>
  );
}

export default App;
