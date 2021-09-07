var roleUpgrader = {

    /** @param {Creep} creep **/
    
    it:0,
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {//能量耗尽时采集
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {//能量采集满时进入upgrade状态
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleUpgrader;