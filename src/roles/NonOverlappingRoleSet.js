const Discord = require('discord.js');

/**
 * Represents a set of roles that shouldn't be allowed to exist together at the same time, such as
 * having the Sophomore and Senior role at the same time.
 */
class NonOverlappingRoleSet {
  /**
   *
   * @param {string} nameOfSet
   * @param {string[]} roles
   * @param {string[]} roleEmojis
   */
  constructor(nameOfSet, roles, roleEmojis) {
    this.nameOfSet = nameOfSet;
    this.roles = roles;
    this.roleEmojis = roleEmojis;

    /**
     * Create an array where each item is an array with the role name as the first item and the
     * emoji for the role as the second item.
     */
    this.rolesAndEmotes = this.roles.map((roleName, index) => [roleName, this.roleEmojis[index]]);
  }

  /**
   * Returns the given name for this set as set in the constructor.
   * @return {string}
   */
  getNameOfSet() {
    return this.nameOfSet;
  }

  /**
   * Returns the roles of this set.
   * @return {string[]}
   */
  getRoles() {
    return this.roles;
  }

  /**
   * Returns the role that was related to the given emoji.
   * @param {string} emoji The emoji used to find the matching role.
   * @return {string}
   */
  getRoleFromEmoji(emoji) {
    return this.roles[this.roleEmojis.indexOf(emoji)];
  }

  /**
   * Returns true if this set contains the given role.
   * @param {string} nameOfRole The name of the role to check against the set.
   * @return {boolean}
   */
  contains(nameOfRole) {
    return this.roles.includes(nameOfRole);
  }

  /**
   * Compares the roles of a user to the roles in this set and returns the roles of this set that
   * a user also has.
   * @param {Discord.GuildMember} user
   * @return {Discord.Role[]}
   */
  findMatchingRoles(user) {
    const userRoles = user.roles.array();
    const rolesOfThisSet = this.roles;
    const rolesInThisSetThatUserHas = userRoles.filter(function(role) {
      return rolesOfThisSet.includes(role.name);
    });

    return rolesInThisSetThatUserHas;
  }
}

module.exports = NonOverlappingRoleSet;
