import {Component} from 'react';
import {MultiValueProps, StylesConfig} from 'react-select';
import {withTheme} from '@emotion/react';

import Button from 'sentry/components/button';
import SelectControl from 'sentry/components/forms/selectControl';
import TeamSelector from 'sentry/components/forms/teamSelector';
import RoleSelectControl from 'sentry/components/roleSelectControl';
import {IconClose} from 'sentry/icons/iconClose';
import {t} from 'sentry/locale';
import {MemberRole, SelectValue} from 'sentry/types';
import {Theme} from 'sentry/utils/theme';

import renderEmailValue from './renderEmailValue';
import {InviteStatus} from './types';

type SelectOption = SelectValue<string>;

type Props = {
  disableRemove: boolean;
  disabled: boolean;
  emails: string[];
  inviteStatus: InviteStatus;
  onChangeEmails: (emails: null | SelectOption[]) => void;
  onChangeRole: (role: SelectOption) => void;
  onChangeTeams: (teams?: SelectOption[] | null) => void;
  onRemove: () => void;
  role: string;
  roleDisabledUnallowed: boolean;
  roleOptions: MemberRole[];

  teams: string[];
  theme: Theme;
  className?: string;
};

type State = {
  inputValue: string;
};

function ValueComponent(
  props: MultiValueProps<SelectOption>,
  inviteStatus: Props['inviteStatus']
) {
  return renderEmailValue(inviteStatus[props.data.value], props);
}

function mapToOptions(values: string[]): SelectOption[] {
  return values.map(value => ({value, label: value}));
}

class InviteRowControl extends Component<Props, State> {
  state: State = {inputValue: ''};

  handleInputChange = (inputValue: string) => {
    this.setState({inputValue});
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const {onChangeEmails, emails} = this.props;
    const {inputValue} = this.state;
    switch (event.key) {
      case 'Enter':
      case ',':
      case ' ':
        onChangeEmails([...mapToOptions(emails), {label: inputValue, value: inputValue}]);
        this.setState({inputValue: ''});
        event.preventDefault();
        break;
      default:
      // do nothing.
    }
  };

  render() {
    const {
      className,
      disabled,
      emails,
      role,
      teams,
      roleOptions,
      roleDisabledUnallowed,
      inviteStatus,
      onRemove,
      onChangeEmails,
      onChangeRole,
      onChangeTeams,
      disableRemove,
      theme,
    } = this.props;

    return (
      <div className={className}>
        <SelectControl
          data-test-id="select-emails"
          disabled={disabled}
          placeholder={t('Enter one or more emails')}
          inputValue={this.state.inputValue}
          value={emails}
          components={{
            MultiValue: props => ValueComponent(props, inviteStatus),
            DropdownIndicator: () => null,
          }}
          options={mapToOptions(emails)}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value &&
            onChangeEmails([
              ...mapToOptions(emails),
              {label: e.target.value, value: e.target.value},
            ])
          }
          styles={getStyles(theme, inviteStatus)}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          onChange={onChangeEmails}
          multiple
          creatable
          clearable
          menuIsOpen={false}
        />
        <RoleSelectControl
          data-test-id="select-role"
          disabled={disabled}
          value={role}
          roles={roleOptions}
          disableUnallowed={roleDisabledUnallowed}
          onChange={onChangeRole}
        />
        <TeamSelector
          data-test-id="select-teams"
          disabled={disabled}
          placeholder={t('Add to teams\u2026')}
          value={teams}
          onChange={onChangeTeams}
          multiple
          clearable
        />
        <Button
          borderless
          icon={<IconClose />}
          size="zero"
          onClick={onRemove}
          disabled={disableRemove}
          aria-label={t('Remove')}
        />
      </div>
    );
  }
}

/**
 * The email select control has custom selected item states as items
 * show their delivery status after the form is submitted.
 */
function getStyles(theme: Theme, inviteStatus: Props['inviteStatus']): StylesConfig {
  return {
    multiValue: (
      provided: React.CSSProperties,
      {data}: MultiValueProps<SelectOption>
    ) => {
      const status = inviteStatus[data.value];
      return {
        ...provided,
        ...(status?.error
          ? {
              color: theme.red300,
              border: `1px solid ${theme.red300}`,
              backgroundColor: theme.red100,
            }
          : {}),
      };
    },
    multiValueLabel: (
      provided: React.CSSProperties,
      {data}: MultiValueProps<SelectOption>
    ) => {
      const status = inviteStatus[data.value];
      return {
        ...provided,
        pointerEvents: 'all',
        ...(status?.error ? {color: theme.red300} : {}),
      };
    },
    multiValueRemove: (
      provided: React.CSSProperties,
      {data}: MultiValueProps<SelectOption>
    ) => {
      const status = inviteStatus[data.value];
      return {
        ...provided,
        ...(status?.error
          ? {
              borderLeft: `1px solid ${theme.red300}`,
              ':hover': {backgroundColor: theme.red100, color: theme.red300},
            }
          : {}),
      };
    },
  };
}

export default withTheme(InviteRowControl);
