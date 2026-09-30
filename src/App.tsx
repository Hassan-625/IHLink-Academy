import {BusinessPortal,AcademyCertificateVerification} from '@/pages/business-centre/BusinessPortal';
import {Navigate,Route,Routes} from 'react-router-dom';
import {ProtectedRoute} from '@/components/ProtectedRoute';
import {BusinessUnitPage,BusinessCustomerWorkspace} from '@/pages/business-centre/BusinessOperations';
import {SignInPage} from '@/pages/auth/SignInPage';
import {RegisterPage} from '@/pages/auth/RegisterPage';
import {ResetPasswordPage} from '@/pages/auth/ResetPasswordPage';
import {UpdatePasswordPage} from '@/pages/auth/UpdatePasswordPage';
import {VerifyEmailPage} from '@/pages/auth/VerifyEmailPage';
import {AuthHandoffPage} from '@/pages/auth/AuthHandoffPage';
import {BusinessSupport,BusinessAccessDenied} from '@/pages/business-centre/BusinessNavigation';
const unit='academy' as const;
const prefix='/academy';
export default function App(){return <Routes>
<Route path="/" element={<BusinessUnitPage unit={unit}/>}/>
<Route path={prefix} element={<BusinessUnitPage unit={unit}/>}/>
<Route path={prefix+'/dashboard'} element={<ProtectedRoute product={unit} requireServiceAccess><BusinessPortal unit={unit}/></ProtectedRoute>}/>
<Route path={prefix+'/verify-certificate'} element={<AcademyCertificateVerification/>}/>
<Route path={prefix+'/:page'} element={<ProtectedRoute product={unit} requireServiceAccess><BusinessPortal unit={unit}/></ProtectedRoute>}/>
<Route path={prefix+'/get-in-touch'} element={<BusinessSupport unit={unit}/>}/>
<Route path="/access-denied" element={<BusinessAccessDenied unit={unit}/>}/>
<Route path="/admin/access-denied" element={<BusinessAccessDenied unit={unit}/>}/>
<Route path="/business-centre/workspace" element={<Navigate to={prefix+'/dashboard'} replace/>}/>
<Route path="/signin" element={<SignInPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/reset-password" element={<ResetPasswordPage/>}/><Route path="/auth/update-password" element={<UpdatePasswordPage/>}/><Route path="/verify-email" element={<VerifyEmailPage/>}/><Route path="/auth/handoff" element={<AuthHandoffPage/>}/>
<Route path="*" element={<Navigate to={prefix} replace/>}/>
</Routes>}
