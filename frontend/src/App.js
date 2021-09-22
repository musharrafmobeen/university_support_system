import logo from './logo.svg';
import './App.css';
import Home from './views/home/Home'
import { Route, Switch } from 'react-router-dom';
import { DrawerWidthProvider } from './contexts/DrawerWidthContext';
import { ThemeModeContext, ThemeModeProvider } from "./contexts/ThemeModeContext";
import AdminSideDrawer from './views/admin/AdminSideDrawer';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import PageContent from './views/helpers/PageContent';
import DashboardContentPane from './views/helpers/DashboardContentPane';
import AdminDashboard from './views/admin/AdminDashboard';
import PendingRequests from './views/admin/PendingRequests';
import EmployeesPendingRequests from './views/admin/pendingRequestsCards/EmployeesPendingRequests';
import Categories from './views/admin/Categories';
import RejectedAccounts from './views/admin/RejectedAccounts';
import EmployeesRejectedAccounts from './views/admin/rejectedAccountsCards/EmployeesRejectedAccounts';
import DocumentsRequests from './views/admin/DocumentsRequests';
import StaffSideDrawer from './views/staff/StaffSideDrawer';
import AdminGrievances from './views/admin/AdminGrievances';
import AdminStaffs from './views/admin/AdminStaffs';
import GrievanceDetails from './views/admin/grievancesCards/GrievanceDetails';
import StaffGrievances from './views/staff/StaffGrievances';
import StaffGrievancesDetails from './views/staff/grievancesCards/GrievanceDetails';
import StaffStaffs from './views/staff/StaffStaffs';
import StaffTimeTable from './views/staff/StaffTimeTable';
import Try from './views/staff/Try';
import StudentSideDrawer from './views/student/StudentSideDrawer';
import StudentStaff from './views/student/StudentStaff';
import StaffProfile from './views/student/staffCards/StaffProfile';
import StaffScheduleView from './views/student/staffCards/StaffScheduleView';
import StaffDashBoard from './views/staff/StaffDashBoard';
import StaffAppointmentRequests from './views/staff/StaffAppointmentRequests';
import StudentGrievances from './views/student/StudentGrievances';
import GriavanceCreateForm from './views/student/grievanceCards/GriavanceCreateForm';
import GrievanceEditForm from './views/student/grievanceCards/GrievanceEditForm';
import RequestAppointment from './views/student/RequestAppointment';
import StudentDashBoard from './views/student/StudentDashBoard';
import EmployeeSideDrawer from './views/employee/EmployeeSideDrawer';
import EmployeeStaff from './views/employee/EmployeeStaff';
import EmployeeDashBoard from './views/employee/EmployeeDashBoard';
import EmployeeGrievances from './views/employee/EmployeeGrievances';
import EmployeeStaffScheduleView from './views/employee/staffCards/EmployeeStaffScheduleView';
import EmployeeStaffProfile from './views/employee/staffCards/EmployeeStaffProfile';
import AdminStaffProfile from './views/admin/staffCards/AdminStaffProfile';
import AdminStaffScheduleView from './views/admin/staffCards/AdminStaffScheduleView';
import StaffStaffProfile from './views/staff/staffCards/StaffStaffProfile';
import StaffStaffScheduleView from './views/staff/staffCards/StaffStaffScheduleView';
import RejectedUserAccount from './views/home/RejectedAccount';
import PageNotFound from './views/home/PageNotFound';
import PendingUserAccPage from './views/home/PendingUserAccPage';
import StudentDocRequests from './views/student/StudentDocRequests';
import ViewDocument from './views/student/documentsCards/ViewDocument';
import Certificate from './views/admin/documentRequests/Certificate';
import StaffMessages from './views/student/staffCards/StaffMessages';
import RefrenceLetter from './views/helpers/RefrenceLetter';
import StaffDocRequests from './views/staff/StaffDocRequests';
import StaffCertificate from './views/staff/documentCards/StaffCertificate';
import StaffAccountProfile from './views/staff/StaffAccountProfile';
import StudentAccountProfile from './views/student/StudentAccountProfile';
import AdminAccountProfile from './views/admin/AdminAccountProfile';
import EmployeeAccountProfile from './views/employee/EmployeeAccountProfile';
import AdminAnnouncements from './views/admin/AdminAnnouncements';
import AnnouncementDetails from './views/home/AnnouncementDetails';
import StaffAnnouncements from './views/staff/StaffAnnouncements';
import StaffChats from './views/staff/StaffChats';
import SingleChatMessages from './views/staff/chatsCrd/SingleChatMessages';
// import SaveFile from './views/helpers/SaveFile';

function App() {


  const store = configureStore();

  return (
    <div className="App">
      <Provider store={store}>
        <DrawerWidthProvider>
          <ThemeModeProvider>
            <Switch>
              <Route exact path="/" render={() =>
                <Home />
              } />
              <Route path="/admin" render={
                () =>
                  <PageContent color={"#E5E5E5"}>
                    <AdminSideDrawer />
                    <Route exact path="/admin/dashboard" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminDashboard />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/pending-requests/students-requests" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <PendingRequests />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/pending-requests/employees-requests" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeesPendingRequests />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/categories" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <Categories />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/grievances" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminGrievances />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/grievances/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <GrievanceDetails {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/staff" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminStaffs />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/staff/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminStaffProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/staff/:id/schedule" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminStaffScheduleView {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/documents-requests" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <DocumentsRequests />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/documents-requests/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <Certificate {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    {/* <Route exact path="/admin/documents-requests/:id/save" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <SaveFile {...routerProps} />
                      </DashboardContentPane>
                    }
                    /> */}
                    <Route exact path="/admin/rejected-accounts/students-accounts" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <RejectedAccounts />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/rejected-accounts/employees-accounts" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeesRejectedAccounts />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/announcements" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminAnnouncements />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/admin/my-profile" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <AdminAccountProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                  </PageContent>
              }
              />
              <Route path="/staff" render={
                () =>
                  <PageContent color={"#E5E5E5"}>
                    <StaffSideDrawer />
                    <Route exact path="/staff/dashboard" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffDashBoard />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/grievances" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffGrievances />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/grievances/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffGrievancesDetails {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/staff" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffStaffs />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/staff/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffStaffProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/staff/:id/schedule" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffStaffScheduleView {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/time-table" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffTimeTable />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/appointments-requests" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffAppointmentRequests />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/documents-requests" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffDocRequests />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/documents-requests/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffCertificate {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/announcements" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffAnnouncements />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/messages" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffChats />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/messages/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <SingleChatMessages {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/staff/my-profile" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffAccountProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                  </PageContent>
              }
              />
              <Route path="/student" render={
                () =>
                  <PageContent color={"#E5E5E5"}>
                    <StudentSideDrawer />
                    <Route exact path="/student/dashboard" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StudentDashBoard />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/grievances" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StudentGrievances />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/grievances/lodge-grievance" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <GriavanceCreateForm />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/grievances/:id" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <GrievanceEditForm />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/staff" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StudentStaff />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/staff/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/staff/:id/chat" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffMessages {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/staff/:id/schedule" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StaffScheduleView {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/documents-requests" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StudentDocRequests {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/documents-requests/view/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <ViewDocument {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/request-appointments" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <RequestAppointment {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/student/my-profile" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <StudentAccountProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                  </PageContent>
              }
              />
              <Route path="/employee" render={
                () =>
                  <PageContent color={"#E5E5E5"}>
                    <EmployeeSideDrawer />
                    <Route exact path="/employee/dashboard" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeeDashBoard />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/grievances" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeeGrievances />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/grievances/lodge-grievance" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <GriavanceCreateForm />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/grievances/:id" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <GrievanceEditForm />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/staff" render={() =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeeStaff />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/staff/:id" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeeStaffProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/staff/:id/schedule" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeeStaffScheduleView {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/request-appointments" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>

                      </DashboardContentPane>
                    }
                    />
                    <Route exact path="/employee/my-profile" render={(routerProps) =>
                      <DashboardContentPane color={"#E5E5E5"}>
                        <EmployeeAccountProfile {...routerProps} />
                      </DashboardContentPane>
                    }
                    />
                  </PageContent>
              }
              />
              <Route exact path="/users/account-approval-pending"
                render={() =>
                  <PendingUserAccPage />
                }
              />
              <Route exact path="/users/account-rejected"
                render={() =>
                  <RejectedUserAccount />
                }
              />
              <Route exact path="/announcements/:id"
                render={(routerProps) =>
                  <AnnouncementDetails {...routerProps} />
                }
              />
              <Route
                render={() =>
                  <PageNotFound />
                }
              />
            </Switch>
          </ThemeModeProvider>
        </DrawerWidthProvider>
      </Provider>
    </div>
  );
}

export default App;
