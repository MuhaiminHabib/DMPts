import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  console.log('role is:', role)
  if (role === 'A') {
    can('manage', 'all')
    cannot(['read'], ['analytics-baStats', 'analytics-dmStats', 'analytics-cStats'])
  } else if (role === 'BA') {
    can('manage', 'all')
    cannot(['read'], ['businesses-navItem'])
    cannot(['read'], ['analytics-aStats', 'analytics-dmStats', 'analytics-cStats'])
  } else if (role === 'DM') {
    can('manage', 'all')
    cannot(['read'], ['businesses-navItem', 'dm-navItem'])
    cannot(['read'], ['analytics-aStats', 'analytics-baStats', 'analytics-cStats'])
  } else if (role === 'C') {
    can(['manage'], 'all')
    cannot(
      ['read'],
      ['analytics-aStats', 'analytics-baStats', 'analytics-dmStats', 'businesses-navItem', 'dm-navItem', 'c-navItem']
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
        'add-post',
        'ba-list-page',
        'c-list-page',
        'cm-list-page',
        'dm-list-page'
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
