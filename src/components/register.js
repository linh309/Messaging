import React from 'react';
import ReactDOM from 'react-dom';

class Register extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">User Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="User Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Date of birth</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" placeholder="Date of birth" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Gender</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Gender" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Avatar Url</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Avatar Url" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <button type="submit" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;