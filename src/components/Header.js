import React from 'react';

class Header extends React.Component {
    render() {
        return (
          <header className="p-4 bg-dark text-white">
              <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  {/* <!-- <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                  <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
                  </a> --> */}
          
                  <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  {/* <!-- <li><a href="#" className="nav-link px-2 text-secondary">Logo</a></li> --> */}
                  <li><a href="#" className="nav-link px-2"><img src="img/school.png"/></a></li>
                  <li><a href="#" className="nav-link px-2 text-secondary">Học phần</a></li>
                  <li><a href="#" className="nav-link px-2 text-white">Giới thiệu</a></li>
                  </ul>
          
                  <div className="dropdown text-end">
                  <a href="#" className="d-block link-light text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                      <label className="text-white px-3" title="Nguyễn Văn A">Nguyễn Văn A</label>
                      <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                  </a>
                  <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                      <li><a className="dropdown-item" href="#">Thông tin cá nhân</a></li>
                      <li><a className="dropdown-item" href="#">Đổi mật khẩu</a></li>
                      {/* <!-- <li><hr className="dropdown-divider"></li> --> */}
                      <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
                  </ul>
                  </div>
              </div>
              </div>
          </header>
        )
    }
}

export default Header;