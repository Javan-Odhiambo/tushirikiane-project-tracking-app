// LocalStorageService.js

type LocalStorageServiceType = {
    getService: Function
    setToken: Function
    getAccessToken: Function
    getRefreshToken: Function
    clearToken: Function
}

const LocalStorageService: LocalStorageServiceType = ( function(){
    var _service: LocalStorageServiceType ;

    function _getService(this: { getService: () => LocalStorageServiceType; setToken: (tokenObj: any) => void; getAccessToken: () => string | null; getRefreshToken: () => string | null; clearToken: () => void }) {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setToken(tokenObj:any) {
        tokenObj.access && localStorage.setItem('access_token', tokenObj.access);
        tokenObj.refresh && localStorage.setItem('refresh_token', tokenObj.refresh);
    }

    function _getAccessToken() {
        return localStorage.getItem('access_token');
    }

    function _getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }

    function _clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken
    }

}) ();

export default LocalStorageService ;

