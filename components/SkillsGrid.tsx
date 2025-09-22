'use client'

import { m } from 'framer-motion'

interface Skill {
  name: string
  icon?: string
}

interface SkillsGridProps {
  skills?: Skill[]
  className?: string
}

const defaultSkills: Skill[] = [
  { name: 'Brand Systems' },
  { name: 'Conversion UX' },
  { name: 'Motion Design' },
  { name: 'Next.js' },
  { name: 'Performance' },
  { name: 'Typography' },
  { name: 'Design Tokens' },
  { name: 'A11y' },
  { name: 'Analytics' },
  { name: 'Prototyping' }
]

export default function SkillsGrid({ skills = defaultSkills, className = '' }: SkillsGridProps) {
  return (
    <div className={`skills ${className}`}>
      {skills.map((skill, index) => (
        <m.div
          key={skill.name}
          className="skill"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{
            delay: index * 0.06,
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          <span className="skill__name">{skill.name}</span>
        </m.div>
      ))}
    </div>
  )
}