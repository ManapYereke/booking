import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import './TrafficRulesInstructions.css';

const TrafficRulesInstructions = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]); // Store the fetched data

  // Define the URL of the API endpoint
  const apiUrl = "/api/stream/departments/";

  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data); // Save the fetched data to state
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  // Map the data to table rows with translations
  const tableRows = data.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td style={{ textAlign: 'center' }}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {t("streamWatch")}
        </a>
      </td>
    </tr>
  ));

  return (
    <div className="offset_traffic_rules_inst">
      <br />
      <center>
        <h2>{t("stream")}</h2>
      </center>
      <br />
      <div id="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>№</th>
              <th>{t("streamSectorName")}</th>
              <th style={{ textAlign: 'center' }}>{t("streamLink")}</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TrafficRulesInstructions;


// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import ReactDOM from 'react-dom'; // Import ReactDOM

// import './TrafficRulesInstructions.css';

// const TrafficRulesInstructions = () => {
//   const { t } = useTranslation();

//   // Define the URL of the API endpoint
//   const apiUrl = "/api/stream/departments/";

//   useEffect(() => {
//     // Fetch data from the API
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         // Create an array to store table rows
//         const rows = [];

//         // Loop through the retrieved data and populate the rows
//         data.forEach((item, index) => {
//           const row = (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td style={{ textAlign: 'center' }}>
//                 <a href={item.link} target="_blank" rel="noopener noreferrer">
//                   {t("streamWatch")}
//                 </a>
//               </td>
//             </tr>
//           );
//           rows.push(row);
//         });

//         // Render the table with the rows
//         ReactDOM.render(
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 <th>№</th>
//                 <th>{t("streamSectorName")}</th>
//                 <th style={{ textAlign: 'center' }}>{t("streamLink")}</th>
//               </tr>
//             </thead>
//             <tbody>{rows}</tbody>
//           </table>,
//           document.getElementById('table-container')
//         );
//       })
//       .catch(error => {
//         console.error('Error fetching data from API:', error);
//       });
//   }, []);

//   return (
//     <div className="offset_traffic_rules_inst">
//       <br />
//       <center>
//         <h2>{t("stream")}</h2>
//       </center>
//       <br />
//       <div id="table-container"></div>
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// };

// export default TrafficRulesInstructions;








// {
/* <h1 className='header_text mt-3 size_title_page text-center mb-3'>
{/* Инструкция ПДД */
// {t("instructionPDD")}
// </h1>
// <div className='d-flex align-items-center justify-content-center w-100 mt-2'>
// <button className='btn btn-info text-white mx-1'>
//   {/* Скачать на КАЗ */}
//   {t("downloadKAZ")}
// </button>
// <button className='btn btn-info text-white mx-1'>
//   {/* Скачать на РУС */}
//   {t("downloadRUS")}
// </button>
// </div> */}