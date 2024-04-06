import { Skill } from '../../skill/entities/skill.entity';
import { setSeederFactory } from 'typeorm-extension';
export default setSeederFactory(Skill, (faker) => {
  const skill = new Skill();
  skill.designation = faker.internet.domainWord();

  return skill;
});
