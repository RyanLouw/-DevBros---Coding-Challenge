export function bikeDetailsTemplate(bike)  {
    return `
      <h2>${bike.Make} ${bike.Model}</h2>
      <p>Year: ${bike.Year}</p>
      <p>Displacement: ${bike.Displacement}cc</p>
      <p>Price: ${bike.Price}</p>
      <p>Terrain: ${bike.Terrain}</p>
      <p>Description: ${bike.Description}</p>
    `;
  }