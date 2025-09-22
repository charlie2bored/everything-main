'use client'

import { m } from 'framer-motion'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

interface Skill {
  name: string
  category?: string
}

interface SkillsGridProps {
  skills: Skill[]
  className?: string
}

export default function SkillsGrid({ skills, className = '' }: SkillsGridProps) {
  return (
    <m.div 
      className={`skills ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={stagger(0.06)}
    >
      {skills.map((skill, index) => (
        <m.div
          key={skill.name}
          className="skill"
          variants={fadeUp}
        >
          <h3 className="skill__name">{skill.name}</h3>
          {skill.category && (
            <span className="skill__category">{skill.category}</span>
          )}
        </m.div>
      ))}
    </m.div>
  )
}
