import React from "react";
import ReactLoading from "react-loading";

const ReactLoadingComponent = () => {
    return (
        <ReactLoading
            type="bubbles"
            color="#243495"
            height={200}
            width={185}
            className="loading-bubbles"
        />
    );
};

export default ReactLoadingComponent;
