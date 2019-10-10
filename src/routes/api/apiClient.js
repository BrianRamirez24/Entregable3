const express = require('express');
const bcryst = require('bcryptjs');
const path = require('path');
const router = express.Router();
const {createClient,
       listClient,
       updateClient,
       destroyClient,
       fiterClient
} = require('../../controller/apicontroller/apiclientcontroller');

router.router('/api/client')
.get(listClient)
.post(createClient)

router.router('api/client/:id')
.put(updateClient)
.delete(destroyClient)

router.router('api/client/filter')
.get(fiterClient)










module.exports = router;