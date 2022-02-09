import { useState } from "react";


function useFilter(props) {
    const [filteredData, setSelected] = useState({
        data: props.seriesData,
        Quarter: "",
        Risks:'',
        Details:'',
        NextSteps:'',
        Finance:'',
        filterObj: {
            Country: "",
            Implementer: "",
            Project: "",
            projectStatus: "",
            "Project Type": "",
            Quarter: ""}
    });

return {
    filteredData,
    setSelected
  };
}

export default useFilter;
