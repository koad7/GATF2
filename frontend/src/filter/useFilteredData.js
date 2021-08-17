import useFilter from '../hooks/useFilter';




export default function useFilteredData(props){
 // Dropdown work
let [projectName,projectType, projectImplementer,projectYear, projectCountry, projectStatus ]= [[], [], [],[], [], []]
// Get all unique values for the dropdown select filter
props.seriesData.forEach(x => {
   projectName.push(x.Project);
   projectType.push(x["Project Type"]);
   projectImplementer.push(x["Implementer"]);
   projectYear.push(x["Quarter"]);
   projectCountry.push(x["Country"]);
   projectStatus.push(x["Status"]);
})
// Dropdown Selection unique values (remove empty field)
let projectSelect = [...new Set(projectName)].sort().filter(function (el) {return el !== "";});
let projectTypeSelect = [...new Set(projectType)].sort().filter(function (el) {return el !== "";});
let implementerSelect = [...new Set(projectImplementer)].sort().filter(function (el) {return el !== "";});
let yearSelect = [...new Set(projectYear)].sort().filter(function (el) {return el !== "";});
let countrySelect = [...new Set(projectCountry)].sort().filter(function (el) {return el !== "";});
let statusSelect = [...new Set(projectStatus)].sort().filter(function (el) {return el !== "";});

const {filteredData, setSelected} = useFilter(props);
// Filter Main data and Risk, Finance, Details by Quarter
const handleFilterSelected = (event) => {
 const newFilterObj = {
     ...filteredData.filterObj,
     [event.target.name]: event.target.value
     
 }
     setSelected({
       ...filteredData,
       filterObj:newFilterObj,
   });
 };

return {
    filteredData,
    setSelected,
    projectSelect,
    projectTypeSelect,
    implementerSelect,
    yearSelect,
    countrySelect,
    statusSelect,
    handleFilterSelected
  };
}

