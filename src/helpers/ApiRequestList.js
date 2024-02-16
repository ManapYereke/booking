const { btoa } = window;
export const getCitiesList = async () => {
  const url = "/api/cities/";
  const username = "admin";
  const password = "admin";

  // console.log("Basic " + btoa(username + ":" + password));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
  });

  const result = await response.json();
  return result;
};



export const getDepartmentList = async () => {
  const url = "/api/departments/";
  const username = "admin";
  const password = "admin";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
  });

  const result = await response.json();
  return result;
};


export const getDepartmentById = async (id) => {
  const url = "api/departments/"
  const username = 'admin'
  const password = 'admin'

  const response = await fetch(url + id, {
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
    method: "GET"
  })

  const result = await response.json()
  return result;
}

export const getExamDateById = async (id) => {
  const username = "admin";
  const password = "admin";

  const response = await fetch(`/api/exams/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
  });

  const result = await response.json();
  return result;
};

// export const getFreeExamPractice = async (id, categoryName, kpp) => {
//   const username = "admin";
//   const password = "admin";

//   const obj = {
//     department_id: id,
//     category: categoryName,
//     kpp: kpp,
//   };

//   fetch(`/api/practice/free/exams/`, {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + btoa(username + ":" + password),
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
//     },
//     body: JSON.stringify(obj),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(`Request failed with status code ${response.status}`);
//       }
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch(function (res) {
//       return res
//     });
// };

export const getUserByAppNumber = async (id) => {
  const url = "/api/search/applicant/";
  const username = "admin";
  const password = "admin";

  const response = await fetch(url + id, {
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
    method: "GET",
  });

  const result = response.json();

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return result;
};

export const verifyUserByIIN = async (iin, token) => {
  var myHeaders = new Headers(); myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET', headers: myHeaders, redirect: 'follow'
  };
  fetch("http://booking.gov4c.kz/api/verify/" + iin, requestOptions)
    .then(response => response.json)
    .then(result => result)
    .catch(error => error);
}



export const verifySMSCode = async (obj) => {
  const url = "/api/verify/"
  const username = "admin"
  const password = "admin"

  fetch(url, {
    header: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Accept": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
    method: "POST",
    body: JSON.stringify(obj),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  })
    .then((data) => {
      return data;
    })
    .catch(function (res) {
      return res
    });

}
