import {
    PREDICTION_MODAL_NAME,
    ADD_DATA_MODAL_NAME,
    CREATE_PROJECT_MODAL_NAME,
    UPGRADE_MODAL_NAME,
    CHANGE_PASSWORD_MODAL_NAME,
    RECOVER_PASSWORD_MODAL_NAME,
    CHECK_EMAIL_MODAL_NAME,
    REQUEST_UPGRADE_MODAL_NAME,
    CONFIGURE_PROJECT_MODAL_NAME,
    DELETE_ENTITY_MODAL_NAME,
    CHECK_LATER_MODAL_NAME,
} from 'constants/modal.constants';

import PredictionModal from './PredictionModal';
import AddDataModal from './AddDataModal';
import CreateProjectModal from './CreateProjectModal';
import UpgradeModal from './UpgradeModal';
import ChangePassword from './ChangePassword';
import RecoverPassword from './RecoverPassword';
import CheckEmailModal from './CheckEmailModal';
import RequestUpgradeModal from './RequestUpgradeModal';
import ConfigureProjectModal from './ConfigureProjectModal';
import DeleteEntityModal from './DeleteEntityModal';
import CheckLaterModal from './CheckLaterModal';

const modalMap = {
    [PREDICTION_MODAL_NAME]: PredictionModal,
    [ADD_DATA_MODAL_NAME]: AddDataModal,
    [CREATE_PROJECT_MODAL_NAME]: CreateProjectModal,
    [UPGRADE_MODAL_NAME]: UpgradeModal,
    [CHANGE_PASSWORD_MODAL_NAME]: ChangePassword,
    [RECOVER_PASSWORD_MODAL_NAME]: RecoverPassword,
    [CHECK_EMAIL_MODAL_NAME]: CheckEmailModal,
    [REQUEST_UPGRADE_MODAL_NAME]: RequestUpgradeModal,
    [CONFIGURE_PROJECT_MODAL_NAME]: ConfigureProjectModal,
    [DELETE_ENTITY_MODAL_NAME]: DeleteEntityModal,
    [CHECK_LATER_MODAL_NAME]: CheckLaterModal,
};

export default modalMap;
