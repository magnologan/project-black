import React from 'react'

import DirsearchTable from './DirsearchTable.jsx'


class TablesAccumulator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let tables = [];

		for (var each_ip of this.props.ips) {
			for (var each_port of each_ip.scans) {
				let files = each_ip.files.filter((x) => {
					return x.port_number == each_port.port_number;
				});

				tables.push(
					<DirsearchTable key={each_ip.ip_id + "_" + each_port.scan_id} 
									target={each_ip.ip_address}
									port_number={each_port.port_number}
									files={files}/>
				);				
			}
		}

		for (var each_host of this.props.hosts) {
			for (var each_ip_address of each_host.ip_addresses) {				
				for (var each_port of each_ip_address.scans) {
					let files = each_host.files.filter((x) => {
						return x.port_number == each_port.port_number;
					});

					tables.push(
						<DirsearchTable key={each_host.host_id + "_" + each_port.scan_id} 
										target={each_host.hostname}
										port_number={each_port.port_number}
										files={files}/>
					);
				}
			}
		}		

		return (
			<div>
				{tables}
			</div>
		)
	}
}

export default TablesAccumulator;
