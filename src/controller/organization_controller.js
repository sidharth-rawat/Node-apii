const http_formatter = require('../_util/formatter');
const Organization = require('../model/organization_model');

const organizationGet = (request, response) => { 

    const query_obj = (Object.keys(request.query).length > 0) ? request.query : {}; 

    Organization
    .find({})
    .then(data => {
        return response.status(200).json(
            http_formatter(data)
        )
    }).catch(err => {
        return response.status(400).json(
            http_formatter(err, "Document validation failed", false)
        )
    })
}

const getOrgById = (request, response) => {
    const {organization_id} = request.params;
    Organization.findById(organization_id).then(data => {
        return response.status(200).json(
            http_formatter(data)
        )
    }).catch(err => {
        return response.status(400).json(
            http_formatter(err, "No record found", false)
        )
    })
}


const organizationPost = (request, response) => {
    const _errors = [];
    ['name','address', 'phone', 'email'].forEach(key => {
        if(!request.body[key]){
            _errors.push(`${key} is required. Please dedo.`);
        }
    })

    if(_errors.length > 0) {
        return response.status(400).json(
            http_formatter(_errors, "All fields are mandatory", false)
        )
    }

    const orgObj = new Organization(request.body);
    Organization.create(orgObj).then(data => {
        return response.status(201).json(
            http_formatter(data, "Organization created successfully")
        )
    }).catch(err => {
        return response.status(400).json(
            http_formatter(err, "Document validation failed", false)
        )
    });

}

const organisationUpdate = (request, response) => {
    const {  organization_id } = request.params;
    const query = { _id: organization_id } 

    const {name, email, address} = request.body;
    Organization.findOneAndUpdate(query, {name, email, address})
    .then(data => response.status(200).json(http_formatter(data, "Organisation updated successfully")))
    .catch(error => response.status(400).json(http_formatter(error, "Something went wrong", false)))

}

const organisationDelete = (request, response) => {
    const {organization_id} = request.params;
    if(!organization_id) {
        return response.status(400).json(http_formatter({}, "Invalid organisation ID, no record found", false));
    }
    Organization.deleteOne({
        _id: organization_id
    })
    .then(data => response.status(200).json(http_formatter(data, "Organisation removed successfully")))
    .catch(error => response.status(400).json(http_formatter(error, "Something went wrong", false)))
}

module.exports = {organizationGet, organizationPost, getOrgById, organisationDelete, organisationUpdate};