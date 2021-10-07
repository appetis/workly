const { Team, User, Profile } = require('../models');

exports.create = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Team,
          attributes: ['id', 'name'],
        },
      ],
    });
    const teams = user.get('Teams');
    if (teams && teams.length > 0) {
      return res.status(403).send('The user is already in a team');
    }

    const { name } = req.body;
    const team = await Team.findOne({
      where: { name },
    });
    if (team) {
      return res.status(403).send(`${name} is already in use.`);
    }

    const newTeam = await Team.create({
      name,
    });

    newTeam.addMembers(userId);

    return res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

exports.getMembersById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'email', 'status'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Profile,
              attributes: ['position', 'phone'],
            },
          ],
        },
      ],
    });
    if (!team) {
      return res.status(400).json({
        code: 400,
        message: 'Cannot find the team',
      });
    }

    return res.status(200).json({
      code: 200,
      team,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error',
    });
  }
};

exports.getByName = async (req, res) => {
  try {
    const { name } = req.params;
    const team = await Team.findOne({
      where: { name },
    });
    if (!team) {
      return res.status(204).send('Cannot find the team');
    }

    return res.status(200).json(team);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

exports.join = async (req, res) => {
  try {
    const { userId } = req.body;
    const { teamId } = req.body;

    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Team,
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!user) {
      return res.status(400).send('Cannot find the user');
    }

    const teams = user.get('Teams');
    console.log('user:', user);
    console.log('teams:', teams);
    if (teams && teams.length > 0) {
      return res.status(403).send('The user is already in a team');
    }

    const team = await Team.findOne({
      where: { id: teamId },
    });
    if (!team) {
      return res.status(400).send('Cannot find the team');
    }

    team.addMembers(userId);

    return res.status(200).json(team);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};
