import React, { useState } from "react";
import CreateModule from "./CreateModule";
import CreateModuleV2 from "./CreateModulev2";
import CreateQuiz from "./CreateQuiz";
import QuestionCreation from "./QuestionCreation";

function CreateNew() {
  const [activeTab, setActiveTab] = useState("createModule");
  const handleModuleSubmit = () => {
    setActiveTab("createQuiz");
  };
  return (
    <div className="d-flex align-items-start">
      <div
        className="nav flex-column nav-pills me-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          className="nav-link active"
          id="v-pills-createModule-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-createModule"
          type="button"
          role="tab"
          aria-controls="v-pills-createModule"
          aria-selected="true"
        >
          Create module
        </button>
        <button
          className="nav-link"
          id="v-pills-createQuiz-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-createQuiz"
          type="button"
          role="tab"
          aria-controls="v-pills-createQuiz"
          aria-selected="false"
        >
          Create quiz
        </button>
        <button
          className="nav-link"
          id="v-pills-createQue-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-createQue"
          type="button"
          role="tab"
          aria-controls="v-pills-createQue"
          aria-selected="false"
        >
          Create question
        </button>
      </div>
      <div className="tab-content" id="v-pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-createModule"
          role="tabpanel"
          aria-labelledby="v-pills-createModule-tab"
          tabIndex="0"
        >
          <CreateModule onSubmit={handleModuleSubmit} />
          {/* <CreateModuleV2 /> */}
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-createQuiz"
          role="tabpanel"
          aria-labelledby="v-pills-createQuiz-tab"
          tabIndex="0"
        >
          <CreateQuiz />
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-createQue"
          role="tabpanel"
          aria-labelledby="v-pills-createQue-tab"
          tabIndex="0"
        >
          <QuestionCreation />
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
