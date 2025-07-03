const Specials = () => {
  const specials = [
    {
      title: "Greek edad",
      time: "1:1:00",
      description: "The famous goods doll of the original book by the founder of the Royal Society."
    },
    {
      title: "Lemon & Olive Oil Lentil Soup",
      time: "1:0:0",
      description: "Yellow lentils simmered with garlic, cumin, and generous lemon juice"
    },
    {
      title: "Zesty Lemon & Date Dressing",
      time: "1:0:15",
      description: "Whisk fresh lemon juice with silan (date syrup), mint, and black seed oil"
    },
  ]
  return (
    <section className='specials'>
      <h2>Specials</h2>
      <div className='specials-grid'>
        {specials.map((item, index) => (
          <div key={index} className='specials-card'>
            <h3>{item.title}</h3>
            <p>{item.time}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Specials