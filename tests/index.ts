import { config } from 'dotenv';
import express from 'express';
import { DeviceData, UDIDFetcher } from '../src';

config();
const app = express();
const port = process.env.PORT;

const devices: DeviceData[] = [];

app.get('/', (req, res) => res.json(devices));

app.use('/', new UDIDFetcher({
	name: 'Test thingy',
	description: 'Testing to see if this works',
	identifier: 'ca.s0n1c.test',
	organization: 'S0n1c',
	apiURL: `${process.env.API_URL}/user/device/`,
	query: {
		id: 'foobar'
	},
	done: (req, res) => {
		console.log(req.query.id);
		devices.push(req.device);
		return res.redirect('/');
	}
}).router);


app.listen(port, () => {
	console.log(`Live at port ${port}`);
});
