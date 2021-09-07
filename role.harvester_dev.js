var roleHarvester = {
    /** @param {Creep} creep **/
    it:0,
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(this.it >= 2){//在各个资源点均匀采集
                this.it = 0;
            }
            if(creep.memory.hasOwnProperty('target') == false){
                creep.memory['target'] = this.it;
                creep.say('🧭Target x:' + sources[creep.memory.target].x + 'y:' + sources[creep.memory.target].y);
                this.it++;
            }
            if(creep.harvest(sources[creep.memory.target]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.target], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;