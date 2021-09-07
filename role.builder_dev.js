var roleBuilder = {
    it:0,
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('debug');
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {//能量耗尽时采集
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {//能量采集满时进入build状态
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
	        if(this.it >= 2){//在各个资源点均匀采集
                this.it = 0;
            }
            if(creep.memory.hasOwnProperty('harvestTarget') == false){
                creep.memory['harvestTarget'] = this.it;
                this.it++;
            }
            if(creep.harvest(sources[creep.memory.harvestTarget]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.harvestTarget], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;