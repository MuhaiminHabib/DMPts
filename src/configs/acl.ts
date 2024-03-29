import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

const defineRulesFor = (role: string, subject: string) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  console.log('role is:', role)
  if (role === 'A') {
    can('manage', 'all')
    cannot(
      ['read'],
      [
        'analytics-baStats',
        'analytics-dmStats',
        'analytics-cStats',
        'analytics-cmStats',
        'welcome-card',
        'tag-navItem',
        'tag-page'
      ]
    )
    cannot(['read'], ['edit-post', 'delete-post'])
  } else if (role === 'BA') {
    can('manage', 'all')
    cannot(['read'], ['businesses-navItem', 'cm-navItem'])
    cannot(
      ['read'],
      ['analytics-aStats', 'analytics-dmStats', 'analytics-cStats', 'analytics-cmStats', 'cm-list-page', 'filter-ba']
    )
  } else if (role === 'DM') {
    can('manage', 'all')
    cannot(['read'], ['businesses-navItem', 'dm-navItem', 'cm-navItem', 'tag-navItem'])
    cannot(
      ['read'],
      [
        'analytics-aStats',
        'analytics-baStats',
        'analytics-cStats',
        'analytics-cmStats',
        'filter-ba',
        'filter-dm',
        'tag-page'
      ]
    )
  } else if (role === 'C') {
    can(['manage'], 'all')
    cannot(
      ['read'],
      [
        'analytics-aStats',
        'analytics-baStats',
        'analytics-dmStats',
        'analytics-cmStats',
        'businesses-navItem',
        'tag-page',
        'dm-navItem',
        'c-navItem',
        'tag-navItem',
        'edit-post',
        'delete-post',
        'add-post',
        'filter-ba',
        'filter-dm',
        'filter-c'
      ]
    )
  } else if (role === 'CM') {
    can(['manage'], 'all')
    cannot(
      ['read'],
      [
        'analytics-aStats',
        'analytics-baStats',
        'analytics-dmStats',
        'analytics-cStats',
        'users-navItem',
        'tag-navItem',
        'add-post',
        'ba-list-page',
        'c-list-page',
        'dm-list-page',
        'cm-list-page',
        'tag-page',
        'edit-post',
        'delete-post',
        'add-post'
      ]
    )
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
