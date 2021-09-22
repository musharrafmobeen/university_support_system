import { combineReducers } from "redux";
import employeesReducer from './employees';
import staffsReducer from './staffs';
import studentsReducer from './students';
import adminReducer from './admins';


export default combineReducers({
    students: studentsReducer,
    employees: employeesReducer,
    staffs: staffsReducer,
    admins: adminReducer
});