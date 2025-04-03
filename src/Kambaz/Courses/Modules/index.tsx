import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import {setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    // const { currentUser } = useSelector((state: any) => state.usersReducer);
    const dispatch = useDispatch();  
    // const isFaculty = currentUser?.role === "FACULTY";
    const fetchModules = async () => {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };
    useEffect(() => {
      fetchModules();
    }, []);

    const createModuleForCourse = async () => {
      if (!cid || !moduleName.trim()) return;
    
      const moduleToCreate = { name: moduleName, course: cid };
      const createdModule = await coursesClient.createModuleForCourse(cid, moduleToCreate);
    
      console.log("✅ Module returned from backend:", createdModule); // <-- MUST include _id
      dispatch(addModule(createdModule));
      setModuleName("");
    };

    const removeModule = async (moduleId: string) => {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    };
  
    const saveModule = async (module: any) => {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    };
  
  
    return (
      <div className="wd-modules">
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          // dispatch(addModule({ name: moduleName, course: cid }));
          // setModuleName("");
          createModuleForCourse();  // <-- ✅ CALL IT
          setModuleName("");
        }} /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          {modules
            // .filter((module: any) => module.course === cid)
            .map((module: any) => (
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> 
                <BsGripVertical className="me-2 fs-3" /> 
                {!module.editing && module.name}
                { module.editing && (
                  <FormControl className="w-50 d-inline-block"
                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            // dispatch(updateModule({ ...module, editing: false }));
                            saveModule({ ...module, editing: false });
                          }
                        }}
                        defaultValue={module.name}/>
                )}
                <ModuleControlButtons moduleId={module._id} 
                  // deleteModule={(moduleId) => {dispatch(deleteModule(moduleId));}} 
                  deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}/>
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons /> </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
    </div>

  );}
