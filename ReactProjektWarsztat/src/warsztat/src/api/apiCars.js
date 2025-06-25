export let cars = [];

export async function getCars() {
  try {
    const response = await fetch("http://localhost:5180/api/CarRepair");
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("Parsed JSON data:", data);
      return data;
    } else {
      const textData = await response.text();
      console.log("Response text (not JSON):", textData);
      throw new Error(
        `Serwer zwrócił dane w formacie: ${contentType}. Otrzymane dane: ${textData.substring(
          0,
          200
        )}...`
      );
    }
  } catch (error) {
    console.error("Błąd podczas pobierania aut:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function removeFromCar(carId) {
  try {
    const response = await fetch(
      `http://localhost:5180/api/CarRepair/${carId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    console.log(`Car with ID ${carId} deleted`);
    return {
      status: "success",
      message: `Samochód o ID ${carId} został usunięty.`,
    };
  } catch (error) {
    console.error("Błąd przy usuwaniu auta:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function updateCar(carId, newCar) {
  newCar.id = carId;

  try {
    const response = await fetch(
      `http://localhost:5180/api/CarRepair/${carId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    console.log("Auto zaktualizowane poprawnie");
    return { status: "success", message: "Auto zaktualizowane poprawnie" };
  } catch (error) {
    console.error("Błąd przy aktualizacji auta:", error.message);
    return { status: "error", message: error.message };
  }
}

export async function addCar(newCar) {
  try {
    const response = await fetch("http://localhost:5180/api/CarRepair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Błąd ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(data);
    return { status: "success", message: "Auto dodane poprawnie", data };
  } catch (error) {
    console.error("Błąd przy dodawaniu auta:", error.message);
    return { status: "error", message: error.message };
  }
}
