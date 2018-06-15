

class Email {


	constructor(configFields = {}, configValues = {} ){
		this.configFields = configFields;
		this.configValues = configValues;
	}

	getCongfigFields(){
		return this.configFields;
	}

	setConfigFields(configFields){
		this.configFields = configFields;
	}

	getConfigValues(){
		return this.configValues;
	}

	setConfigValues(configValues){
		this.configValues = configValues;
	}
}